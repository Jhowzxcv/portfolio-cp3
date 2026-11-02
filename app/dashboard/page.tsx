import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Dashboard } from '@/components/Dashboard';
import { currentOwner } from '@/services/auth';
import './dashboard.css';

export const metadata: Metadata = { title: 'Dashboard', robots: { index: false, follow: false } };
export default async function DashboardPage() {
  const owner = await currentOwner();
  if (!owner) redirect('/login');
  return (
    <main id="main" className="container dashboard-page">
      <Dashboard email={owner.email || ''} />
    </main>
  );
}
