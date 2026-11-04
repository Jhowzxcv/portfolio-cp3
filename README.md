# Jhonathan Dourado · Portfólio CP3

Portfólio pessoal em React com Next.js, projetos vindos da API pública do GitHub, formulário de contato e dashboard exclusivo do proprietário. Trabalho individual da FIAP sobre stack e harness de IA.

## Links e entrega

- GitHub: https://github.com/Jhowzxcv/portfolio-cp3
- Produção: https://portfolio-cp3-nu.vercel.app
- O que ainda depende do dono: [SUA-PARTE.md](docs/SUA-PARTE.md).
- Roteiro do vídeo: [ROTEIRO-VIDEO.md](docs/ROTEIRO-VIDEO.md).
- Requisitos e situação de cada item: [REQUISITOS.md](docs/REQUISITOS.md).
- Evidências e limites: [VALIDACAO.md](docs/VALIDACAO.md).

## Rodar localmente

Requer Node.js 24 e npm.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

No PowerShell, use `Copy-Item .env.example .env.local`. Acesse http://127.0.0.1:3000. A listagem pública de projetos funciona sem chaves. Login, mensagens e seleção persistente de destaques exigem Supabase; notificações exigem Resend. Não existe login de demonstração nem senha embutida.

Execute `supabase/schema.sql` no seu Supabase e preencha as variáveis indicadas em `.env.example`. Veja os passos em [SUA-PARTE.md](docs/SUA-PARTE.md). Nunca envie `.env.local` ao GitHub.

## Stack e responsabilidades

| Camada         | Tecnologia                            | Responsabilidade                                     |
| -------------- | ------------------------------------- | ---------------------------------------------------- |
| Interface      | React 19, TypeScript, CSS             | Componentes, acessibilidade, tema e formulários      |
| Aplicação      | Next.js 16 App Router                 | Rotas por projeto, renderização e APIs no servidor   |
| Dados públicos | GitHub REST + fetch                   | Repositórios sem cadastro manual; cache de 5 minutos |
| Dados privados | Supabase/PostgreSQL                   | Mensagens, destaques, limite de envio persistente    |
| Autenticação   | Supabase Auth                         | Verificação de token e UUID exclusivo do dono        |
| Notificações   | Resend REST                           | E-mail com Reply-To; reenvio de falhas no painel     |
| Qualidade      | Biome, TypeScript, Vitest, Playwright | Padrões, validação e navegação real                  |
| Publicação     | Vercel + integração Git               | Deploy de main e previews por branch                 |

Comparações, critérios e perdas aceitas estão em [DECISOES.md](docs/DECISOES.md). Abra [arquitetura.html](docs/arquitetura.html) no navegador para o diagrama visual do vídeo.

```text
app/                    rotas e endpoints HTTP
  projetos/[slug]/      URL individual por repositório
  dashboard/            página autenticada e CSS por rota
  api/                  projetos, contato, login e administração
components/             componentes visuais em PascalCase
hooks/                  useProjects e useDashboard
services/               GitHub, Supabase, autenticação, e-mail
lib/                    tipos e validação pura com Zod
tests/                  regras e handlers de API
e2e/                    fluxos de navegador desktop/mobile
supabase/               schema e função transacional
.agents/skills/         procedimento de revisão da entrega
.codex/                 configuração opcional de MCP
```

Chamadas de banco e segredos permanecem em services e handlers de servidor. O contexto React guarda os projetos entre rotas, sem nova consulta ao navegar; atualizações do navegador fazem uma consulta à API da aplicação, enquanto o cache do servidor reduz acessos ao GitHub. O dashboard tem seu próprio bundle de rota e não é importado pela home. A interface segue a organização de documentações técnicas: índice lateral, conteúdo central, links de seção e cards compactos de repositórios. No celular, a navegação abre em um dialog nativo. O tema padrão é claro; a preferência do visitante é preservada. Não há imagens grandes nem dependência de WebGL.

## Segurança e comportamento de falha

- A sessão usa cookie HttpOnly, SameSite=Strict e Secure em produção. O Supabase verifica o token a cada acesso privado; apenas `OWNER_USER_ID` é autorizado. Sessões expiram em até 1 hora e exigem novo login.
- RLS e revogação de acesso impedem leitura direta das tabelas por visitantes. O backend usa a service role exclusivamente no servidor e verifica o dono antes de qualquer operação administrativa.
- O contato é validado no cliente e no servidor. A função SQL aplica até 5 mensagens por IP pseudonimizado em 10 minutos; advisory lock evita corrida entre instâncias. A UUID de idempotência evita duplicação na repetição do mesmo envio.
- A mensagem é salva antes do e-mail. Se o provedor falhar, o formulário informa que ela foi salva com aviso pendente; o dono pode reenviar o aviso no dashboard. `sent` significa aceito pelo provedor, não comprovação de entrega na caixa de entrada.
- Sem configurações externas, rotas correspondentes retornam indisponibilidade explícita. Não se finge gravação ou envio com localStorage.
- Limites: até 200 mensagens mais recentes no painel e até 1.000 repositórios por usuário; sem paginação administrativa nesta entrega. O reenvio do Resend usa idempotência, cuja janela é limitada pelo provedor.

## Qualidade

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Localmente os testes E2E usam Microsoft Edge. Na CI usam Chromium, instalado pelo workflow. Se sua máquina não possui Edge, execute os testes com `CI=true` e instale Chromium com `npx playwright install chromium` (no PowerShell: `$env:CI='true'`). A CI não precisa das chaves de produção: os testes públicos usam respostas controladas; os testes de bloqueio de acesso consultam o servidor real sem sessão.

## Padrões e Git

Componentes em PascalCase; funções e variáveis em camelCase; hooks iniciados por `use`; serviços fora da apresentação. Biome aplica imports, lint e formatação. `npm ci` configura os hooks versionados: antes de cada commit são verificados Biome, tipos e testes; mensagens de commit seguem Conventional Commits.

GitHub Flow: criar `feature/<nome>`, `fix/<nome>` ou `docs/<nome>`, implementar, validar e integrar em `main`. Exemplos reais desta entrega: `feature/portfolio-github` e `feature/dashboard-contato`. Não reescrever datas para simular trabalho antigo. O histórico registra o período real de construção.

A integração Git da Vercel deve apontar para `main`. A CI valida mudanças; o deploy nativo é acionado por pushes, sem prometer que a Vercel aguardará o workflow de testes se isso não estiver configurado na plataforma.

## Harness de IA

`AGENTS.md` define arquitetura, segurança, branches e critérios. A skill em `.agents/skills/revisar-entrega/SKILL.md` define a revisão final. `.codex/config.toml` registra um MCP opcional de documentação. [HARNESS.md](docs/HARNESS.md) distingue configurações versionadas das ferramentas efetivamente usadas nesta sessão.
