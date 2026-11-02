import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export const SESSION_COOKIE = 'portfolio-owner';
export function authConfigured() {
  return !!(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY && process.env.OWNER_USER_ID);
}
export function authClient() {
  if (!authConfigured()) throw new Error('Login ainda não configurado.');
  return createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_ANON_KEY as string, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}
export async function currentOwner() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token || !authConfigured()) return null;
  try {
    const { data, error } = await authClient().auth.getUser(token);
    if (error || !data.user || data.user.id !== process.env.OWNER_USER_ID) return null;
    return data.user;
  } catch {
    return null;
  }
}
export function validOrigin(request: Request) {
  const origin = request.headers.get('origin');
  return !origin || origin === new URL(request.url).origin;
}
