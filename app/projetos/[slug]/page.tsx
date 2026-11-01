import type { Metadata } from 'next';
import { ProjectDetail } from '@/components/ProjectDetail';

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: slug };
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main id="main" className="detail-page container">
      <ProjectDetail slug={slug} />
    </main>
  );
}
