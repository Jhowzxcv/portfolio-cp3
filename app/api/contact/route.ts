import { createHash, randomUUID } from 'node:crypto';
import { z } from 'zod';
import type { ContactMessage } from '@/lib/types';
import { contactSchema, fieldErrors } from '@/lib/validation';
import { validOrigin } from '@/services/auth';
import { database, databaseConfigured } from '@/services/database';
import { notifyOwner } from '@/services/email';

export async function POST(request: Request) {
  if (!validOrigin(request))
    return Response.json({ error: 'Origem não permitida.' }, { status: 403 });
  if (Number(request.headers.get('content-length') || 0) > 16000)
    return Response.json({ error: 'Mensagem muito longa.' }, { status: 413 });
  let raw: unknown;
  try {
    const text = await request.text();
    if (text.length > 16000)
      return Response.json({ error: 'Mensagem muito longa.' }, { status: 413 });
    raw = JSON.parse(text);
  } catch {
    return Response.json({ error: 'Dados de envio inválidos.' }, { status: 400 });
  }
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success)
    return Response.json(
      { error: 'Confira os campos do formulário.', fields: fieldErrors(parsed.error) },
      { status: 400 },
    );
  if (!databaseConfigured())
    return Response.json(
      { error: 'O formulário ainda não está disponível. Fale comigo pelo LinkedIn enquanto isso.' },
      { status: 503 },
    );
  const requestedId = request.headers.get('idempotency-key') || randomUUID();
  if (!z.uuid().safeParse(requestedId).success)
    return Response.json(
      { error: 'Identificador de envio inválido. Atualize a página.' },
      { status: 400 },
    );
  try {
    const db = database();
    const ip =
      request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      'local';
    const rateKey = createHash('sha256')
      .update(`${process.env.SUPABASE_SERVICE_ROLE_KEY}:${ip}`)
      .digest('hex');
    const { data: id, error } = await db.rpc('submit_contact', {
      p_id: requestedId,
      p_name: parsed.data.name,
      p_email: parsed.data.email,
      p_message: parsed.data.message,
      p_rate_key: rateKey,
    });
    if (error) {
      if (error.message.includes('RATE_LIMIT'))
        return Response.json(
          { error: 'Muitas mensagens em pouco tempo. Aguarde 10 minutos para tentar novamente.' },
          { status: 429 },
        );
      return Response.json(
        { error: 'Não foi possível salvar sua mensagem. Tente novamente mais tarde.' },
        { status: 503 },
      );
    }
    const { data: message, error: readError } = await db
      .from('contact_messages')
      .select('id,name,email,message,created_at,responded,email_status')
      .eq('id', id)
      .single();
    if (readError || !message) throw new Error('Mensagem não confirmada.');
    const notified = await notifyOwner(message as ContactMessage);
    return Response.json(
      {
        message: notified
          ? 'Mensagem recebida! O aviso por e-mail foi enviado e vou responder pelo contato informado.'
          : 'Mensagem recebida e salva! O aviso por e-mail está pendente, mas ela já aparece no meu painel.',
      },
      { status: notified ? 201 : 202, headers: { 'Cache-Control': 'no-store' } },
    );
  } catch {
    return Response.json(
      {
        error:
          'Não foi possível confirmar o envio. Tente novamente; seu identificador de envio será preservado.',
      },
      { status: 503 },
    );
  }
}
