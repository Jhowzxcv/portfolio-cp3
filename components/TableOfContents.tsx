'use client';

import { sections, useActiveSection } from '@/hooks/useActiveSection';

export function TableOfContents() {
  const active = useActiveSection();
  return (
    <aside className="page-index">
      <nav aria-label="Nesta página">
        <span>Nesta página</span>
        {sections.map(({ id, label }) => (
          <a
            href={`#${id}`}
            key={id}
            className={active === id ? 'active' : ''}
            aria-current={active === id ? 'location' : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
