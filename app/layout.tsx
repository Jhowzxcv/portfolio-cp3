import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { ProjectsProvider } from '@/hooks/useProjects';
import './globals.css';

export const metadata: Metadata = {
  icons: { icon: '/icon.svg' },
  title: {
    default: 'Jhonathan Dourado — Desenvolvedor full stack',
    template: '%s | Jhonathan Dourado',
  },
  description:
    'Portfólio de Jhonathan Dourado. Desenvolvedor full stack com foco em Java, Spring Boot e aplicações que resolvem problemas reais.',
};

const themeScript =
  "try{document.documentElement.dataset.theme=localStorage.getItem('portfolio-theme')||'dark'}catch(e){}";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="dark" suppressHydrationWarning>
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: script estático sem dados externos evita flash de tema. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Pular para o conteúdo
        </a>
        <ProjectsProvider>
          <Header />
          {children}
          <footer className="footer container">
            <Link className="wordmark" href="/">
              jd<span>_</span>
            </Link>
            <span>Jhonathan Dourado · Código com propósito.</span>
            <div>
              <a href="https://github.com/Jhowzxcv" target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
              <Link href="/login">Área do dono</Link>
            </div>
          </footer>
        </ProjectsProvider>
      </body>
    </html>
  );
}
