'use client';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="container empty-state">
      <h1>Algo saiu do caminho.</h1>
      <p>Não foi possível carregar esta página. Você pode tentar novamente.</p>
      <button type="button" onClick={reset} className="button primary">
        Tentar novamente
      </button>
    </main>
  );
}
