export default function LoadingDashboard() {
  return (
    <main id="main" className="container dashboard-page" aria-busy="true">
      <p>Carregando painel…</p>
      <div className="skeleton-cover" />
    </main>
  );
}
