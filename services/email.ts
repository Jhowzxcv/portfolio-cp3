import type { ContactMessage } from '@/lib/types';
import { database } from './database';

export async function notifyOwner(message: ContactMessage): Promise<boolean> {
  if (message.email_status === 'sent') return true;
  let sent = false;
  try {
    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO || !process.env.CONTACT_FROM)
      throw new Error('E-mail não configurado.');
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      signal: AbortSignal.timeout(10000),
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `contact/${message.id}`,
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM,
        to: [process.env.CONTACT_TO],
        reply_to: message.email,
        subject: `Novo contato no portfólio: ${message.name}`,
        text: `Nome: ${message.name}\nE-mail: ${message.email}\n\n${message.message}`,
      }),
    });
    sent = response.ok;
  } catch {
    sent = false;
  }
  const { error } = await database()
    .from('contact_messages')
    .update({ email_status: sent ? 'sent' : 'failed' })
    .eq('id', message.id);
  // Aceite do provedor não prova entrega na caixa de entrada.
  return sent && !error;
}
