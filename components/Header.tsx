'use client';

import {
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  FolderGit2,
  Github,
  Menu,
  Moon,
  Sun,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { sections, useActiveSection } from '@/hooks/useActiveSection';
import { useProjects } from '@/hooks/useProjects';

function Navigation({ close }: { close?: () => void }) {
  const pathname = usePathname();
  const active = useActiveSection(pathname === '/');
  const { data } = useProjects();
  return (
    <>
      <nav aria-label={close ? 'Navegação móvel' : 'Navegação lateral'}>
        <div className="nav-group-label">Portfólio</div>
        {sections.map(({ id, label }) => (
          <Link
            key={id}
            href={`/#${id}`}
            onClick={close}
            className={`sidebar-link ${pathname === '/' && active === id ? 'active' : ''}`}
            aria-current={pathname === '/' && active === id ? 'location' : undefined}
          >
            <span>{label}</span>
            {pathname === '/' && active === id && <ChevronRight size={13} />}
          </Link>
        ))}
        <div className="nav-group-label repositories-label">Repositórios</div>
        <div className="repository-links">
          {data?.projects.slice(0, 6).map((project) => (
            <Link
              href={`/projetos/${encodeURIComponent(project.name)}`}
              key={project.id}
              onClick={close}
              className={`sidebar-repo ${pathname === `/projetos/${project.name}` ? 'active' : ''}`}
              aria-current={pathname === `/projetos/${project.name}` ? 'page' : undefined}
            >
              <FolderGit2 size={14} />
              <span>{project.name}</span>
            </Link>
          ))}
        </div>
        <a
          className="sidebar-link sidebar-external"
          href="https://github.com/Jhowzxcv?tab=repositories"
          target="_blank"
          rel="noreferrer"
        >
          Todos no GitHub <ArrowUpRight size={13} />
        </a>
      </nav>
      <div className="sidebar-bottom">
        <Link href="/login" onClick={close}>
          Área do dono
        </Link>
        <span>Jhonathan Dourado</span>
      </div>
    </>
  );
}

export function Header() {
  const [dark, setDark] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    setDark(document.documentElement.dataset.theme === 'dark');
  }, []);
  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    try {
      localStorage.setItem('portfolio-theme', next ? 'dark' : 'light');
    } catch {
      /* Preferência disponível apenas nesta visita. */
    }
  }
  return (
    <>
      <header className="header">
        <div className="header-brand">
          <button
            className="icon-button mobile-menu"
            type="button"
            aria-label="Abrir navegação"
            onClick={() => dialog.current?.showModal()}
          >
            <Menu size={20} />
          </button>
          <Link href="/" className="wordmark">
            <span className="brand-mark">JD</span>
            <span className="brand-name">Jhonathan Dourado</span>
          </Link>
          <span className="header-divider" />
          <span className="header-label">Portfólio</span>
        </div>
        <div className="header-actions">
          <a
            href="https://github.com/Jhowzxcv"
            aria-label="GitHub"
            target="_blank"
            rel="noreferrer"
            className="header-external"
          >
            <Github size={16} />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/jhonathan-dourado-846239324/"
            target="_blank"
            rel="noreferrer"
            className="header-external linkedin-link"
          >
            LinkedIn <ArrowUpRight size={14} />
          </a>
          <span className="header-divider" />
          <button
            type="button"
            className="icon-button theme-toggle"
            onClick={toggle}
            aria-label={dark ? 'Ativar tema claro' : 'Ativar tema escuro'}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>
      <aside className="sidebar">
        <div className="sidebar-title">
          <BookOpen size={17} /> Índice
        </div>
        <Navigation />
      </aside>
      <dialog className="mobile-sidebar" ref={dialog} aria-labelledby="mobile-nav-title">
        <div className="mobile-dialog-heading">
          <strong id="mobile-nav-title">Navegação</strong>
          <button
            className="icon-button"
            type="button"
            aria-label="Fechar navegação"
            onClick={() => dialog.current?.close()}
          >
            <X size={20} />
          </button>
        </div>
        <Navigation close={() => dialog.current?.close()} />
      </dialog>
    </>
  );
}
