'use client';

import { ArrowUpRight, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Header() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    setDark(document.documentElement.dataset.theme !== 'light');
  }, []);
  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    try {
      localStorage.setItem('portfolio-theme', next ? 'dark' : 'light');
    } catch {
      /* Tema continua funcionando sem storage. */
    }
  }
  return (
    <header className="header container">
      <Link href="/" className="wordmark" aria-label="Jhonathan Dourado, início">
        jd<span>_</span>
      </Link>
      <nav aria-label="Navegação principal">
        <Link href="/#projetos">Projetos</Link>
        <Link href="/#sobre">Sobre</Link>
        <Link href="/#contato">
          Contato <ArrowUpRight size={14} />
        </Link>
      </nav>
      <button
        type="button"
        className="icon-button theme-toggle"
        onClick={toggle}
        aria-label={dark ? 'Ativar tema claro' : 'Ativar tema escuro'}
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>
  );
}
