import Link from 'next/link';
export default function NotFound() {
  return (
    <main id="main" className="container empty-state not-found">
      <span className="big-404">
        404<span>_</span>
      </span>
      <h1>Essa rota ainda não foi construída.</h1>
      <p>Mas tem bastante coisa para explorar no meu portfólio.</p>
      <Link href="/" className="button primary">
        Voltar para o início ↗
      </Link>
    </main>
  );
}
