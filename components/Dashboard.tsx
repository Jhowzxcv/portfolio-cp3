'use client';

import { Check, Inbox, LogOut, Mail, RotateCcw, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDashboard } from '@/hooks/useDashboard';
import { useProjects } from '@/hooks/useProjects';

export function Dashboard({ email }: { email: string }) {
  const { data, loading, saving, error, load, update, logout } = useDashboard();
  const {
    data: projects,
    loading: projectsLoading,
    error: projectsError,
    retry: retryProjects,
  } = useProjects();
  const [selected, setSelected] = useState<number[]>([]);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    setSelected(data?.featured ?? projects?.featured ?? []);
  }, [data, projects]);
  return (
    <>
      <div className="dashboard-heading">
        <div>
          <span className="eyebrow">ÁREA DO DONO / {email}</span>
          <h1>Seu portfólio, por dentro.</h1>
        </div>
        <button type="button" className="button secondary" onClick={logout} disabled={saving}>
          <LogOut size={16} /> Sair
        </button>
      </div>
      {error && (
        <p className="feedback failure" role="alert">
          {error}{' '}
          <button type="button" className="inline-button" onClick={load}>
            Tentar novamente
          </button>
        </p>
      )}
      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <h2>
            <Inbox size={22} /> Mensagens recebidas
          </h2>
          <span>{data?.messages.length ?? '—'} / últimas 200</span>
        </div>
        {loading ? (
          <div className="skeleton-cover" aria-busy="true" />
        ) : data?.messages.length === 0 ? (
          <div className="empty-state">
            <Mail size={28} />
            <h3>Uma caixa de entrada tranquila.</h3>
            <p>As mensagens do formulário aparecerão aqui.</p>
          </div>
        ) : (
          data?.messages.map((message) => (
            <article
              className={`message-card ${message.responded ? 'responded' : ''}`}
              key={message.id}
            >
              <div className="message-heading">
                <div>
                  <h3>{message.name}</h3>
                  <a href={`mailto:${message.email}`}>{message.email}</a>
                </div>
                <time dateTime={message.created_at}>
                  {new Intl.DateTimeFormat('pt-BR', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                    timeZone: 'America/Sao_Paulo',
                  }).format(new Date(message.created_at))}
                </time>
              </div>
              <p className="message-text">{message.message}</p>
              <div className="message-actions">
                <span className="email-state">
                  {message.email_status === 'sent'
                    ? 'E-mail aceito pelo provedor'
                    : 'Aviso por e-mail pendente'}
                </span>
                {message.email_status !== 'sent' && (
                  <button
                    className="button secondary"
                    type="button"
                    disabled={saving}
                    onClick={() => update({ action: 'retry-email', id: message.id })}
                  >
                    <RotateCcw size={14} /> Reenviar aviso
                  </button>
                )}
                <button
                  type="button"
                  className="button secondary"
                  disabled={saving}
                  onClick={() =>
                    update({ action: 'respond', id: message.id, responded: !message.responded })
                  }
                >
                  <Check size={14} />
                  {message.responded ? 'Marcar como pendente' : 'Marcar como respondida'}
                </button>
              </div>
            </article>
          ))
        )}
      </section>
      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <h2>
            <Star size={22} /> Destaques da home
          </h2>
          <span>Escolha até 6 projetos</span>
        </div>
        <p className="muted">
          A seleção é salva no banco e vale para todos os visitantes. A home atualiza em até 1
          minuto.
        </p>
        {projectsLoading ? (
          <p role="status">Carregando repositórios…</p>
        ) : projectsError ? (
          <p className="feedback failure">
            {projectsError}{' '}
            <button type="button" className="inline-button" onClick={retryProjects}>
              Tentar novamente
            </button>
          </p>
        ) : projects?.projects.length === 0 ? (
          <p>Nenhum projeto público disponível.</p>
        ) : (
          <div className="featured-options">
            {projects?.projects.map((project) => (
              <label key={project.id} className="featured-option">
                <input
                  type="checkbox"
                  checked={selected.includes(project.id)}
                  disabled={
                    saving || !data || (!selected.includes(project.id) && selected.length >= 6)
                  }
                  onChange={(event) => {
                    setSaved(false);
                    setSelected(
                      event.target.checked
                        ? [...selected, project.id]
                        : selected.filter((id) => id !== project.id),
                    );
                  }}
                />
                <span>{project.name}</span>
                <small>{project.language || '—'}</small>
              </label>
            ))}
          </div>
        )}
        <button
          type="button"
          className="button primary"
          disabled={saving || !data || projectsLoading || !!projectsError}
          onClick={async () => {
            setSaved(false);
            if (await update({ action: 'feature', ids: selected })) setSaved(true);
          }}
        >
          {saving ? 'Salvando…' : 'Salvar destaques'}
        </button>
        {saved && (
          <p className="feedback success" role="status">
            Destaques salvos.
          </p>
        )}
      </section>
    </>
  );
}
