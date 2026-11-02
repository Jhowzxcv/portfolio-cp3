import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/LoginForm';
import { currentOwner } from '@/services/auth';
import '../dashboard/dashboard.css';

export const metadata: Metadata = {
  title: 'Área do dono',
  robots: { index: false, follow: false },
};
export default async function Login() {
  if (await currentOwner()) redirect('/dashboard');
  return (
    <main id="main" className="container login-page">
      <LoginForm />
    </main>
  );
}
