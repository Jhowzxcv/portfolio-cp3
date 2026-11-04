# Validação executada

## Redesign com interface de documentação — 03/11/2026

Interface refeita na branch `feature/design-documentacao`: índice lateral, navegação móvel em dialog, índice da página, cards compactos e títulos descritivos. Home, projeto, login, dashboard e páginas de erro seguem o mesmo estilo. Tema padrão claro, preservando a escolha salva do visitante.

- Biome, TypeScript, 16 testes Vitest e build: aprovados.
- Playwright: 20 testes aprovados em execução com servidor reiniciado após o build. Inclui navegação por seções, menu móvel com Escape/retorno de foco e busca sem novas consultas.
- Lighthouse mobile local na versão final: performance 100, acessibilidade 100, boas práticas 100, SEO 100; CLS 0.
- Home inspecionada em desktop e celular; página de projeto e login também inspecionados em tema escuro.
- As medições de produção abaixo registram a versão anterior à revisão visual. A medição da nova publicação é salva em relatório separado na entrega.

Os limites de configuração de Supabase e Resend permanecem os mesmos. Esta revisão altera apresentação e navegação.

## Verificações da entrega inicial

Data: 03/11/2026, horário de São Paulo. Node.js 24.14.0, Windows, Next.js 16.4.5, build de produção.

| Verificação                              | Resultado observado                                                                                         |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Biome lint/formatação                    | Aprovado, sem erros                                                                                         |
| TypeScript                               | Aprovado, sem erros                                                                                         |
| Vitest                                   | 16 testes aprovados em 3 arquivos                                                                           |
| Playwright                               | 20 testes aprovados: 10 cenários em desktop e em mobile                                                     |
| Build Next.js                            | Aprovado, rotas públicas e privadas geradas                                                                 |
| npm audit, dependências de produção      | Nenhuma vulnerabilidade reportada                                                                           |
| Validação da skill por quick_validate.py | Skill is valid                                                                                              |
| API GitHub real em ambiente local        | 13 repositórios públicos retornados antes da criação deste repositório                                      |
| Inspeção visual                          | Página desktop aberta e capturada; responsividade/ausência de transbordamento verificadas nos testes mobile |

## Lighthouse

Medição no endereço `http://127.0.0.1:3000`, com o build de produção, Chrome headless e perfil mobile padrão do Lighthouse. Sem preset desktop. A primeira medição apontou contraste de textos decorativos, nome acessível do logotipo e favicon ausente; os três foram corrigidos e a medição final refeita.

| Categoria          | Nota final local |
| ------------------ | ---------------- |
| Performance mobile | 100              |
| Acessibilidade     | 100              |
| Boas práticas      | 100              |
| SEO                | 100              |

Cumulative Layout Shift medido: 0. Esta é uma medição real local e não garante a mesma nota em toda rede. Os relatórios HTML e JSON estão entre os arquivos de entrega, fora do repositório.

### Medição na Vercel

URL pública: https://portfolio-cp3-nu.vercel.app/ — Lighthouse 13.6.0, medido em 03/11/2026 às 23:01, horário de São Paulo, Chrome headless, perfil mobile padrão.

| Categoria          | Nota em produção |
| ------------------ | ---------------- |
| Performance mobile | 98               |
| Acessibilidade     | 100              |
| Boas práticas      | 100              |
| SEO                | 100              |

FCP e LCP: 1,1 s; CLS: 0. A medição atende ao mínimo de 80 do enunciado. Banco/e-mail ainda não estavam configurados; o relatório cobre a página pública, com projetos reais do GitHub.

### Publicação e CI

Deploy inicial concluído na Vercel com estado READY. O GitHub foi conectado automaticamente ao projeto `portfolio-cp3`. A home pública retornou HTTP 200 e `/api/projects` retornou 14 repositórios públicos após a criação deste repositório.

O workflow remoto também concluiu com sucesso: https://github.com/Jhowzxcv/portfolio-cp3/actions/runs/41757814745. Foram executados instalação limpa, lint, tipos, Vitest, build e Playwright em Linux/Chromium.

## Cobertura dos cenários

- Nome, e-mail, comprimento da mensagem e honeypot; validação também no handler do servidor.
- Ausência de banco, falha de gravação, limite de envio e notificação pendente.
- Ausência de cookie, cookie falso, token rejeitado e usuário autenticado que não é o dono.
- Dashboard sem sessão redireciona para login e APIs privadas respondem 401.
- Projeto abre em URL própria, sobrevive ao refresh e reaproveita a consulta ao navegar.
- Tema persistente, página 404, falha da API com retry, lista vazia e envio bloqueado enquanto pendente.

Os testes de regra/API usam mocks para cenários de serviços externos. Os E2E usam servidor Next de produção real; os dados públicos de teste são controlados no navegador. Isso permite verificar comportamento sem criar dados privados ou enviar e-mails.

## Limites ainda abertos

Não havia projeto Supabase nem conta Resend fornecidos. Assim, não foi executado o SQL em PostgreSQL remoto nem verificado login real, recebimento na caixa de entrada, marcação persistente de respondida ou destaques compartilhados em produção. O código desses fluxos está implementado e os passos de ativação estão em SUA-PARTE.md. Eles precisam ser verificados antes de declarar a entrega integralmente concluída.

O histórico registra as datas reais desta sessão; não atende retroativamente à exigência de trabalho distribuído pelos dias anteriores. A gravação e o upload do vídeo dependem do estudante.
