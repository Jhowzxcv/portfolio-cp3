'use client';

import { RotateCcw, Search } from 'lucide-react';
import { useState } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { ProjectCard } from './ProjectCard';

export function Projects() {
  const { data, loading, error, retry } = useProjects();
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const selected = data?.projects.filter((project) => data.featured.includes(project.id)) || [];
  const visible =
    query || showAll
      ? data?.projects.filter((project) =>
          `${project.name} ${project.language || ''} ${project.description || ''}`
            .toLowerCase()
            .includes(query.toLowerCase()),
        ) || []
      : selected;
  return (
    <section id="projetos" className="doc-section">
      <h2>
        Projetos
        <a className="heading-anchor" href="#projetos" aria-label="Link para Projetos">
          #
        </a>
      </h2>
      <div className="projects-toolbar">
        <fieldset className="project-filters">
          <legend className="sr-only">Exibir projetos</legend>
          <button type="button" aria-pressed={!showAll} onClick={() => setShowAll(false)}>
            Destaques
          </button>
          <button type="button" aria-pressed={showAll} onClick={() => setShowAll(true)}>
            Todos {data && <span>{data.projects.length}</span>}
          </button>
        </fieldset>
        <label className="search">
          <Search size={15} />
          <span className="sr-only">Buscar projetos</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar projetos"
          />
        </label>
      </div>
      {loading ? (
        <div
          className="project-grid"
          role="status"
          aria-label="Carregando projetos"
          aria-busy="true"
        >
          {[0, 1, 2, 3].map((id) => (
            <div className="skeleton-card" key={id}>
              <div className="skeleton-line" />
              <div className="skeleton-line short" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="empty-state" role="alert">
          <h3>Não foi possível carregar os projetos.</h3>
          <p>{error}</p>
          <button type="button" className="button secondary" onClick={retry}>
            <RotateCcw size={15} /> Tentar novamente
          </button>
        </div>
      ) : visible.length === 0 ? (
        <div className="empty-state">
          <h3>Nenhum projeto encontrado.</h3>
          <p>
            {query
              ? 'Tente outro nome ou tecnologia.'
              : 'Nenhum projeto selecionado para destaque.'}
          </p>
          <button
            type="button"
            className="button secondary"
            onClick={() => {
              setQuery('');
              setShowAll(true);
            }}
          >
            Ver todos os projetos
          </button>
        </div>
      ) : (
        <div className="project-grid">
          {visible.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      )}
    </section>
  );
}
