'use client';

import { useEffect, useState } from 'react';

export const sections = [
  { id: 'visao-geral', label: 'Visão geral' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'experiencia', label: 'Experiência' },
  { id: 'tecnologias', label: 'Tecnologias' },
  { id: 'contato', label: 'Contato' },
];

export function useActiveSection(enabled = true) {
  const [active, setActive] = useState('visao-geral');
  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    function update() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const current = sections
          .filter(({ id }) => {
            const element = document.getElementById(id);
            return element && element.getBoundingClientRect().top <= 140;
          })
          .at(-1);
        setActive(current?.id || 'visao-geral');
      });
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
    };
  }, [enabled]);
  return active;
}
