'use client';

import { ArrowLeft, ArrowUpRight, Calendar, Code2, GitBranch, RotateCcw, Star } from 'lucide-react';
import Link from 'next/link';
import { useProjects } from '@/hooks/useProjects';

export function ProjectDetail({ slug }: { slug: string }) {
  const { data, loading, error, retry } = useProjects();
  if (loading)
    return (
      <div className="detail-loading" aria-busy="true">
        <div className="skeleton-line" />
        <div className="skeleton-cover" />
        <p>Carregando projeto…</p>
      </div>
    );
  if (error)
    return (
      <div className="empty-state" role="alert">
        <h1>Não foi possível abrir o projeto.</h1>
        <p>{error}</p>
        <button type="button" className="button secondary" onClick={retry}>
          <RotateCcw size={16} /> Tentar novamente
        </button>
      </div>
    );
  const project = data?.projects.find((item) => item.name.toLowerCase() === slug.toLowerCase());
  if (!project)
    return (
      <div className="empty-state">
        <span className="eyebrow">PROJETO NÃO ENCONTRADO</span>
        <h1>Este projeto não está por aqui.</h1>
        <p>Ele pode ter sido renomeado ou deixado de ser público.</p>
        <Link href="/#projetos" className="button primary">
          Voltar aos projetos
        </Link>
      </div>
    );
  const homepage =
    project.homepage && /^https?:\/\//i.test(project.homepage) ? project.homepage : null;
  return (
    <>
      <Link href="/#projetos" className="text-link">
        <ArrowLeft size={16} /> Todos os projetos
      </Link>
      <div className="detail-heading">
        <span className="eyebrow">PROJETO / {project.language || 'REPOSITÓRIO'}</span>
        <h1>{project.name}</h1>
        <p>
          {project.description ||
            'Um projeto de desenvolvimento, estudo e experimentação. Acesse o repositório para conhecer o código e a documentação.'}
        </p>
        <div className="hero-actions">
          <a className="button primary" href={project.html_url} target="_blank" rel="noreferrer">
            Explorar código <ArrowUpRight size={17} />
          </a>
          {homepage && (
            <a className="button secondary" href={homepage} target="_blank" rel="noreferrer">
              Ver projeto online <ArrowUpRight size={17} />
            </a>
          )}
        </div>
      </div>
      <div className="detail-visual" aria-hidden="true">
        <span>
          {'<'}
          <b>{project.name}</b>
          {' />'}
        </span>
        <Code2 size={100} strokeWidth={0.7} />
      </div>
      <div className="detail-facts">
        <div>
          <Code2 size={20} />
          <span>Linguagem principal</span>
          <strong>{project.language || 'Não informada'}</strong>
        </div>
        <div>
          <Calendar size={20} />
          <span>Última atualização</span>
          <strong>
            {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium', timeZone: 'UTC' }).format(
              new Date(project.updated_at),
            )}
          </strong>
        </div>
        <div>
          <Star size={20} />
          <span>Estrelas no GitHub</span>
          <strong>{project.stargazers_count}</strong>
        </div>
        <div>
          <GitBranch size={20} />
          <span>Fonte dos dados</span>
          <strong>GitHub API</strong>
        </div>
      </div>
      {project.topics.length > 0 && (
        <div className="about-tags">
          {project.topics.map((topic) => (
            <span key={topic}>{topic}</span>
          ))}
        </div>
      )}
      <div className="detail-note">
        <h2>Do problema ao código.</h2>
        <p>
          A descrição, a linguagem e as atualizações desta página vêm diretamente do GitHub. No
          repositório você encontra a implementação, o histórico e as instruções disponíveis para
          executar o projeto.
        </p>
      </div>
    </>
  );
}
