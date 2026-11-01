import { getFeatured } from '@/services/database';
import { GitHubError, getProjects } from '@/services/github';

export async function GET() {
  try {
    const projects = await getProjects();
    const featured = await getFeatured(projects);
    return Response.json(
      { projects, featured },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } },
    );
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof GitHubError
            ? error.message
            : 'Não foi possível carregar os projetos. Tente novamente.',
      },
      { status: 503 },
    );
  }
}
