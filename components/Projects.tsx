'use client';

import { ArrowDown, ArrowUpRight, RotateCcw, Search } from 'lucide-react';
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
    <section id="projetos" className="section container">
      <div className="section-heading">
        <div>
          <span className="eyebrow">01 / TRABALHOS SELECIONADOS</span>
          <h2>
            Ideias que viraram código<span>.</span>
          </h2>
        </div>
        <a
          className="text-link"
          href="https://github.com/Jhowzxcv"
          target="_blank"
          rel="noreferrer"
        >
          GitHub <ArrowUpRight size={17} />
        </a>
      </div>
      <div className="projects-toolbar">
        <p>Projetos reais, direto dos meus repositórios.</p>
        <label className="search">
          <Search size={16} />
          <span className="sr-only">Buscar projetos</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar projeto ou tecnologia"
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
          {[0, 1, 2].map((id) => (
            <div className="skeleton-card" key={id}>
              <div className="skeleton-cover" />
              <div className="skeleton-line" />
              <div className="skeleton-line short" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="empty-state" role="alert">
          <h3>Os projetos não carregaram.</h3>
          <p>{error}</p>
          <button type="button" className="button secondary" onClick={retry}>
            <RotateCcw size={16} /> Tentar novamente
          </button>
        </div>
      ) : visible.length === 0 ? (
        <div className="empty-state">
          <h3>Nenhum projeto por aqui.</h3>
          <p>
            {query
              ? 'Tente outro nome ou tecnologia.'
              : 'Nenhum repositório foi selecionado para destaque.'}
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
          {visible.map((project, index) => (
            <ProjectCard project={project} index={index} key={project.id} />
          ))}
        </div>
      )}
      {!loading && !error && !query && (
        <div className="projects-more">
          <button type="button" className="button secondary" onClick={() => setShowAll(!showAll)}>
            {showAll
              ? 'Ver destaques'
              : `Explorar todos os projetos (${data?.projects.length || 0})`}
            <ArrowDown size={16} className={showAll ? 'rotate' : ''} />
          </button>
        </div>
      )}
    </section>
  );
}
