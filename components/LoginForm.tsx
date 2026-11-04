'use client';

import { ArrowUpRight, LoaderCircle, LockKeyhole } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { type FormEvent, useRef, useState } from 'react';

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const lock = useRef(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lock.current) return;
    lock.current = true;
    setLoading(true);
    setError('');
    const form = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Não foi possível entrar.');
      router.replace('/dashboard');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha na conexão. Tente novamente.');
    } finally {
      lock.current = false;
      setLoading(false);
    }
  }
  return (
    <div className="login-card">
      <div className="login-icon">
        <LockKeyhole size={24} />
      </div>
      <h1>Área do dono</h1>
      <p>Acesso às mensagens e aos projetos em destaque.</p>
      <form onSubmit={submit}>
        <div className="field">
          <label htmlFor="login-email">E-mail</label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="username"
            required
            placeholder="seu@email.com"
          />
        </div>
        <div className="field">
          <label htmlFor="login-password">Senha</label>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="Sua senha"
          />
        </div>
        <button type="submit" className="button primary" disabled={loading}>
          {loading ? (
            <>
              Entrando <LoaderCircle size={17} className="spin" />
            </>
          ) : (
            <>
              Entrar no painel <ArrowUpRight size={17} />
            </>
          )}
        </button>
        {error && (
          <p className="feedback failure" role="alert">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
