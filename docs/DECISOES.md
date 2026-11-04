# Decisões da stack

Estas comparações são a justificativa do projeto. As alternativas foram consideradas por critérios de arquitetura; não foi realizado benchmark comparativo de todos os frameworks.

| Escolha                                  | Alternativa considerada                              | Critério                                                                      | Perda aceita                                                                            |
| ---------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| React com Next.js App Router             | React/Vite + React Router + API separada             | Rotas diretas, funções de servidor e deploy Vercel em um projeto              | Maior complexidade de servidor e regras de componentes server/client                    |
| TypeScript                               | JavaScript                                           | Contratos explícitos para mensagens e repositórios                            | Configuração e checagem adicionais                                                      |
| CSS próprio + Lucide                     | Tailwind e biblioteca de componentes pronta          | Identidade visual simples, sem framework visual adicional                     | Manutenção manual de estilos, responsividade e acessibilidade                           |
| Interface de documentação                | Landing page com ilustrações e cena 3D               | Acesso direto a projetos, experiência e contato; leitura e performance mobile | Menos espaço para apresentação visual decorativa                                        |
| fetch + contexto + cache Next            | TanStack Query ou SWR                                | Uma fonte pública de dados e navegação pequena                                | Revalidação/invalidação mais simples; destaques podem atrasar até 1 minuto no cache CDN |
| Zod compartilhado                        | Validação manual ou Yup                              | Mesmas regras no cliente e no servidor                                        | Uma dependência adicional no bundle do formulário                                       |
| Supabase/PostgreSQL + Auth               | Firebase; backend e autenticação próprios            | Dados relacionais e autenticação gerenciada no mesmo serviço                  | Dependência de fornecedor e configuração externa                                        |
| Serviço de banco só no backend           | Acesso direto do navegador com políticas por usuário | Concentrar autorização e não expor detalhes privados                          | Service role tem alto privilégio: cada endpoint precisa ser auditado                    |
| Cookie HttpOnly e conferência de usuário | Token em localStorage; guarda apenas na interface    | Verificação real no servidor e proteção contra leitura pelo JavaScript        | Sessão sem refresh automático: novo login em até 1 hora                                 |
| Resend via servidor                      | EmailJS ou Formspree                                 | Manter segredo no servidor e unir notificação a mensagem salva                | Precisa de conta e remetente permitido/verificado                                       |
| Gravar antes de notificar                | Enviar e-mail antes de gravar                        | Não perder o contato se o provedor de e-mail cair                             | Duas operações sem transação distribuída; reenvio manual no painel                      |
| Vitest + Playwright                      | Só testes manuais ou só unitários                    | Regras rápidas mais fluxos reais de navegação e autorização                   | E2E exige navegador e demora mais                                                       |
| Biome + hooks versionados                | ESLint + Prettier + Husky                            | Menos ferramentas para lint, imports e estilo                                 | Hooks podem ser pulados; CI também verifica                                             |
| GitHub Flow + Vercel                     | Git Flow e deploy manual                             | Uma aplicação com branch principal e publicação contínua                      | Sem processo de releases de múltiplas versões                                           |

## Referências visuais

A interface usa índice lateral, área central de leitura e índice de seções em telas largas. No celular, o índice lateral passa a um menu em dialog, com foco gerenciado pelo navegador e fechamento por Escape. Os textos usam títulos descritivos e dados profissionais; slogans e capas ilustrativas foram removidos.

Referências de organização e hierarquia: [Java](https://docs.oracle.com/en/java/javase/25/), [Spring Boot](https://docs.spring.io/spring-boot/reference/index.html), [Docker](https://docs.docker.com/get-started/) e [Kubernetes](https://kubernetes.io/docs/concepts/overview/). Não foram usados logotipos ou cópias de seus layouts.

## Fluxos

Projetos: home → useProjects → `/api/projects` → serviço GitHub/cache → API pública. A seleção de destaques vem do banco quando configurado; sem banco, são usados automaticamente os três primeiros repositórios retornados. A seleção vazia salva é respeitada.

Contato: formulário → Zod cliente → `/api/contact` → Zod servidor → SQL atômico/limite/idempotência → mensagem persistida → Resend → status de notificação. Se e-mail falhar, a mensagem continua no banco e o feedback informa a pendência.

Área do dono: `/dashboard` → cookie → `getUser(token)` → UUID proprietário → componente privado. As APIs administrativas repetem a checagem; esconder um botão não é proteção suficiente.

Alteração: branch → código → hook de qualidade → build/E2E → merge main → push → integração Vercel. O workflow do GitHub registra checks e relatório E2E. A integração nativa de deploy não foi configurada para aguardar o workflow.

## Fontes consultadas

- [Next.js: autenticação](https://nextjs.org/docs/app/guides/authentication) e [cookies](https://nextjs.org/docs/app/api-reference/functions/cookies), via Context7.
- [Supabase: chaves de API](https://supabase.com/docs/guides/api/api-keys), via Context7.
- [Resend: envio de e-mail](https://resend.com/docs/api-reference/emails/send-email).
- [Vercel e GitHub](https://vercel.com/docs/git/vercel-for-github).
