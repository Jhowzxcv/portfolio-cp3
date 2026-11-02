import { cookies } from 'next/headers';
import { SESSION_COOKIE, validOrigin } from '@/services/auth';

export async function POST(request: Request) {
  if (!validOrigin(request))
    return Response.json({ error: 'Origem não permitida.' }, { status: 403 });
  (await cookies()).delete(SESSION_COOKIE);
  return Response.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
}
