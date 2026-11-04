import { ArrowUpRight, FolderGit2, Star } from 'lucide-react';
import Link from 'next/link';
import type { Project } from '@/lib/types';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projetos/${encodeURIComponent(project.name)}`} className="project-card">
      <div className="project-card-top">
        <FolderGit2 size={19} strokeWidth={1.6} />
        <ArrowUpRight size={15} />
      </div>
      <h3>{project.name}</h3>
      <p>{project.description || 'Sem descrição no repositório.'}</p>
      <div className="project-meta">
        <span className="project-language">
          <span className={`language-dot language-${project.language?.toLowerCase() || 'other'}`} />
          {project.language || 'Não informada'}
        </span>
        {project.stargazers_count > 0 && (
          <span className="project-stars">
            <Star size={12} />
            {project.stargazers_count}
          </span>
        )}
        <time dateTime={project.updated_at}>
          {new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            timeZone: 'America/Sao_Paulo',
          }).format(new Date(project.updated_at))}
        </time>
      </div>
    </Link>
  );
}
