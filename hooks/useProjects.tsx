'use client';

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { ProjectsResponse } from '@/lib/types';

type State = { data: ProjectsResponse | null; loading: boolean; error: string; retry: () => void };
const Context = createContext<State | null>(null);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ProjectsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const request = useRef<Promise<void> | null>(null);
  const load = useCallback(() => {
    if (request.current) return;
    setLoading(true);
    setError('');
    request.current = (async () => {
      try {
        const response = await fetch('/api/projects', { signal: AbortSignal.timeout(20000) });
        const body = await response.json();
        if (!response.ok) throw new Error(body.error || 'Não foi possível carregar os projetos.');
        setData(body);
      } catch (err) {
        setError(
          err instanceof Error && err.name !== 'TimeoutError'
            ? err.message
            : 'A consulta demorou demais. Tente novamente.',
        );
      } finally {
        setLoading(false);
        request.current = null;
      }
    })();
  }, []);
  useEffect(load, [load]);
  return (
    <Context.Provider value={{ data, loading, error, retry: load }}>{children}</Context.Provider>
  );
}

export function useProjects() {
  const context = useContext(Context);
  if (!context) throw new Error('useProjects precisa de ProjectsProvider.');
  return context;
}
