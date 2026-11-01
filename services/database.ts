import { createClient } from '@supabase/supabase-js';
import type { Project } from '@/lib/types';

export function databaseConfigured() {
  return !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}
export function database() {
  if (!databaseConfigured()) throw new Error('Banco de dados não configurado.');
  return createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string,
    {
      auth: { persistSession: false, autoRefreshToken: false },
    },
  );
}
export async function getFeatured(projects: Project[]): Promise<number[]> {
  // Antes de conectar o banco, os destaques são escolhidos automaticamente dos dados da API.
  if (!databaseConfigured()) return projects.slice(0, 3).map((project) => project.id);
  const { data, error } = await database()
    .from('portfolio_settings')
    .select('featured_ids')
    .eq('id', 1)
    .maybeSingle();
  if (error) throw new Error('Não foi possível carregar os destaques.');
  return data ? (data.featured_ids as number[]) : projects.slice(0, 3).map((project) => project.id);
}
