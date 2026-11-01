import { ArrowUpRight, GitBranch, Star } from 'lucide-react';
import Link from 'next/link';
import type { Project } from '@/lib/types';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link href={`/projetos/${encodeURIComponent(project.name)}`} className="project-card">
      <div className={`project-cover cover-${index % 4}`} aria-hidden="true">
        <span className="cover-index">0{index + 1} / REPOSITORY</span>
        <div className="cover-symbol">{['{ }', '</>', '[ ]', '( )'][index % 4]}</div>
        <span className="cover-name">{project.name.replaceAll('-', ' ').replaceAll('_', ' ')}</span>
        <span className="card-arrow">
          <ArrowUpRight size={20} />
        </span>
      </div>
      <div className="project-info">
        <div className="project-language">
          <span className="language-dot" />
          {project.language || 'Código & experimentação'}
          <span className="project-stars">
            <Star size={12} /> {project.stargazers_count}
          </span>
        </div>
        <h3>{project.name}</h3>
        <p>
          {project.description ||
            'Explore o código, a estrutura e os detalhes deste projeto no GitHub.'}
        </p>
        <div className="project-meta">
          <span>
            <GitBranch size={13} /> Projeto público
          </span>
          <time dateTime={project.updated_at}>
            Atualizado em{' '}
            {new Intl.DateTimeFormat('pt-BR', {
              month: 'short',
              year: 'numeric',
              timeZone: 'UTC',
            }).format(new Date(project.updated_at))}
          </time>
        </div>
      </div>
    </Link>
  );
}
