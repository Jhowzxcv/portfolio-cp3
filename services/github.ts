import { unstable_cache } from 'next/cache';
import type { Project } from '@/lib/types';

export class GitHubError extends Error {}

export const getProjects = unstable_cache(
  async (): Promise<Project[]> => {
    const username = process.env.GITHUB_USERNAME || 'Jhowzxcv';
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const all: Project[] = [];
    for (let page = 1; page <= 10; page++) {
      const response = await fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100&page=${page}`,
        {
          headers,
          signal: AbortSignal.timeout(10000),
          cache: 'no-store',
        },
      );
      if (!response.ok)
        throw new GitHubError(
          response.status === 403 || response.status === 429
            ? 'O limite de consultas do GitHub foi atingido. Tente novamente em alguns minutos.'
            : 'Não foi possível carregar os projetos do GitHub. Tente novamente.',
        );
      const repos = await response.json();
      if (!Array.isArray(repos))
        throw new GitHubError('O GitHub retornou uma resposta inesperada.');
      all.push(
        ...repos
          .filter((repo) => !repo.fork && !repo.archived && repo.name !== username)
          .map((repo) => ({
            id: repo.id,
            name: repo.name,
            description: repo.description,
            html_url: repo.html_url,
            homepage: repo.homepage,
            language: repo.language,
            updated_at: repo.updated_at,
            stargazers_count: repo.stargazers_count,
            topics: repo.topics || [],
          })),
      );
      if (repos.length < 100) break;
    }
    return all;
  },
  ['github-projects-v1'],
  { revalidate: 300 },
);
