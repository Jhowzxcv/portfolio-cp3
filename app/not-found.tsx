import Link from 'next/link';
export default function NotFound() {
  return (
    <main id="main" className="container empty-state not-found">
      <span className="error-code">404</span>
      <h1>Página não encontrada.</h1>
      <p>Confira o endereço ou volte para a página inicial.</p>
      <Link href="/" className="button primary">
        Voltar para o início ↗
      </Link>
    </main>
  );
}
