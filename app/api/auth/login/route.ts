import { cookies } from 'next/headers';
import { loginSchema } from '@/lib/validation';
import { authClient, authConfigured, SESSION_COOKIE, validOrigin } from '@/services/auth';

export async function POST(request: Request) {
  if (!validOrigin(request))
    return Response.json({ error: 'Origem não permitida.' }, { status: 403 });
  if (!authConfigured())
    return Response.json(
      {
        error:
          'A área do dono ainda não foi ativada. Configure o Supabase conforme o guia do projeto.',
      },
      { status: 503 },
    );
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ error: 'Dados inválidos.' }, { status: 400 });
  }
  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success)
    return Response.json({ error: 'Informe e-mail e senha válidos.' }, { status: 400 });
  try {
    const { data, error } = await authClient().auth.signInWithPassword(parsed.data);
    if (error || !data.session || data.user?.id !== process.env.OWNER_USER_ID)
      return Response.json({ error: 'E-mail ou senha incorretos.' }, { status: 401 });
    (await cookies()).set(SESSION_COOKIE, data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: Math.min(data.session.expires_in, 3600),
    });
    return Response.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return Response.json(
      { error: 'Não foi possível entrar agora. Tente novamente.' },
      { status: 503 },
    );
  }
}
