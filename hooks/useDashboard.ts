'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import type { ContactMessage } from '@/lib/types';

type Data = { messages: ContactMessage[]; featured: number[] | null };
export function useDashboard() {
  const router = useRouter();
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const load = useCallback(async () => {
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/admin', { cache: 'no-store' });
      if (response.status === 401) {
        router.replace('/login');
        router.refresh();
        return;
      }
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || 'Não foi possível carregar o painel.');
      setData(body);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha na conexão.');
    } finally {
      setLoading(false);
    }
  }, [router]);
  useEffect(() => {
    void load();
  }, [load]);
  async function update(action: Record<string, unknown>) {
    if (saving) return false;
    setSaving(true);
    setError('');
    try {
      const response = await fetch('/api/admin', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(action),
      });
      if (response.status === 401) {
        router.replace('/login');
        router.refresh();
        return false;
      }
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || 'Não foi possível salvar.');
      await load();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha na conexão.');
      return false;
    } finally {
      setSaving(false);
    }
  }
  async function logout() {
    setSaving(true);
    setError('');
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (!response.ok) throw new Error('Não foi possível sair. Tente novamente.');
      router.replace('/login');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha na conexão.');
    } finally {
      setSaving(false);
    }
  }
  return { data, loading, error, saving, load, update, logout };
}
