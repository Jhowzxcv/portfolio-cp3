'use client';

import { ArrowLeft, ArrowUpRight, ChevronRight, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useProjects } from '@/hooks/useProjects';

export function ProjectDetail({ slug }: { slug: string }) {
  const { data, loading, error, retry } = useProjects();
  if (loading)
    return (
      <div className="detail-loading" aria-busy="true">
        <div className="skeleton-line" />
        <div className="skeleton-card" />
        <p>Carregando projeto…</p>
      </div>
    );
  if (error)
    return (
      <div className="empty-state" role="alert">
        <h1>Não foi possível carregar o projeto.</h1>
        <p>{error}</p>
        <button type="button" className="button secondary" onClick={retry}>
          <RotateCcw size={15} /> Tentar novamente
        </button>
      </div>
    );
  const project = data?.projects.find((item) => item.name.toLowerCase() === slug.toLowerCase());
  if (!project)
    return (
      <div className="empty-state">
        <h1>Projeto não encontrado.</h1>
        <p>O repositório pode ter sido renomeado ou tornado privado.</p>
        <Link href="/#projetos" className="button secondary">
          Voltar aos projetos
        </Link>
      </div>
    );
  const homepage =
    project.homepage && /^https?:\/\//i.test(project.homepage) ? project.homepage : null;
  return (
    <>
      <nav aria-label="Localização" className="breadcrumb">
        <Link href="/">Portfólio</Link>
        <ChevronRight size={13} />
        <Link href="/#projetos">Projetos</Link>
        <ChevronRight size={13} />
        <span>{project.name}</span>
      </nav>
      <div className="detail-heading">
        <span className="document-label">Repositório público</span>
        <h1>{project.name}</h1>
        <p className="lead">{project.description || 'Sem descrição no repositório.'}</p>
        <div className="detail-actions">
          <a className="button primary" href={project.html_url} target="_blank" rel="noreferrer">
            Abrir no GitHub <ArrowUpRight size={15} />
          </a>
          {homepage && (
            <a className="button secondary" href={homepage} target="_blank" rel="noreferrer">
              Ver site <ArrowUpRight size={15} />
            </a>
          )}
        </div>
      </div>
      <section className="doc-section">
        <h2>Informações do repositório</h2>
        <dl className="repository-facts">
          <div>
            <dt>Linguagem principal</dt>
            <dd>{project.language || 'Não informada'}</dd>
          </div>
          <div>
            <dt>Última atualização</dt>
            <dd>
              <time dateTime={project.updated_at}>
                {new Intl.DateTimeFormat('pt-BR', {
                  dateStyle: 'long',
                  timeZone: 'America/Sao_Paulo',
                }).format(new Date(project.updated_at))}
              </time>
            </dd>
          </div>
          <div>
            <dt>Estrelas</dt>
            <dd>{project.stargazers_count}</dd>
          </div>
          <div>
            <dt>Repositório</dt>
            <dd>
              <a href={project.html_url} target="_blank" rel="noreferrer">
                Jhowzxcv/{project.name} <ArrowUpRight size={13} />
              </a>
            </dd>
          </div>
        </dl>
        {project.topics.length > 0 && (
          <div className="topic-tags">
            {project.topics.map((topic) => (
              <span key={topic}>{topic}</span>
            ))}
          </div>
        )}
      </section>
      <div className="detail-next">
        <Link href="/#projetos" className="text-link">
          <ArrowLeft size={15} /> Voltar aos projetos
        </Link>
        <a
          className="text-link"
          href={`${project.html_url}#readme`}
          target="_blank"
          rel="noreferrer"
        >
          README <ArrowUpRight size={15} />
        </a>
      </div>
    </>
  );
}
