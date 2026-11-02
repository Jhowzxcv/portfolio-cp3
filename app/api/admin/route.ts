import { z } from 'zod';
import type { ContactMessage } from '@/lib/types';
import { currentOwner, validOrigin } from '@/services/auth';
import { database } from '@/services/database';
import { notifyOwner } from '@/services/email';
import { getProjects } from '@/services/github';

export async function GET() {
  if (!(await currentOwner()))
    return Response.json({ error: 'Entre novamente para acessar o painel.' }, { status: 401 });
  try {
    const db = database();
    const [{ data: messages, error }, { data: settings, error: settingsError }] = await Promise.all(
      [
        db
          .from('contact_messages')
          .select('id,name,email,message,created_at,responded,email_status')
          .order('created_at', { ascending: false })
          .limit(200),
        db.from('portfolio_settings').select('featured_ids').eq('id', 1).maybeSingle(),
      ],
    );
    if (error || settingsError) throw new Error('Falha no banco.');
    return Response.json(
      { messages, featured: settings?.featured_ids ?? null },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch {
    return Response.json(
      { error: 'Não foi possível carregar o painel. Confira a conexão com o banco.' },
      { status: 503 },
    );
  }
}

const actionSchema = z.discriminatedUnion('action', [
  z.object({ action: z.literal('respond'), id: z.uuid(), responded: z.boolean() }),
  z.object({ action: z.literal('feature'), ids: z.array(z.number().int().positive()).max(6) }),
  z.object({ action: z.literal('retry-email'), id: z.uuid() }),
]);
export async function PATCH(request: Request) {
  if (!validOrigin(request))
    return Response.json({ error: 'Origem não permitida.' }, { status: 403 });
  if (!(await currentOwner()))
    return Response.json({ error: 'Entre novamente para acessar o painel.' }, { status: 401 });
  try {
    const parsed = actionSchema.safeParse(await request.json());
    if (!parsed.success) return Response.json({ error: 'Alteração inválida.' }, { status: 400 });
    const input = parsed.data;
    const db = database();
    if (input.action === 'respond') {
      const { data, error } = await db
        .from('contact_messages')
        .update({ responded: input.responded })
        .eq('id', input.id)
        .select('id')
        .maybeSingle();
      if (error) throw error;
      if (!data) return Response.json({ error: 'Mensagem não encontrada.' }, { status: 404 });
    } else if (input.action === 'feature') {
      const projects = await getProjects();
      if (input.ids.some((id) => !projects.some((project) => project.id === id)))
        return Response.json(
          { error: 'Selecione apenas projetos públicos do portfólio.' },
          { status: 400 },
        );
      const { error } = await db
        .from('portfolio_settings')
        .upsert({ id: 1, featured_ids: [...new Set(input.ids)] });
      if (error) throw error;
    } else {
      const { data, error } = await db
        .from('contact_messages')
        .select('id,name,email,message,created_at,responded,email_status')
        .eq('id', input.id)
        .maybeSingle();
      if (error) throw error;
      if (!data) return Response.json({ error: 'Mensagem não encontrada.' }, { status: 404 });
      if (!(await notifyOwner(data as ContactMessage)))
        return Response.json(
          { error: 'Mensagem está salva, mas o provedor de e-mail ainda não confirmou o envio.' },
          { status: 502 },
        );
    }
    return Response.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return Response.json({ error: 'Não foi possível salvar a alteração.' }, { status: 503 });
  }
}
