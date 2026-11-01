export type Project = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  updated_at: string;
  stargazers_count: number;
  topics: string[];
};
export type ProjectsResponse = { projects: Project[]; featured: number[] };
export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  responded: boolean;
  email_status: 'pending' | 'sent' | 'failed';
};
