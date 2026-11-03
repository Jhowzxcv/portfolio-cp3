# Harness de IA usado no projeto

Harness é o conjunto de instruções, contexto, ferramentas e verificações que orienta a IA e permite conferir seu trabalho.

## Ferramenta e modelo

A implementação foi realizada no Codex desktop, com um agente principal da família GPT-6 conforme a identificação do ambiente. O nome exato da variante não foi fixado no repositório nem escolhido por benchmark. Antes do vídeo, mostre o seletor da sessão e informe o identificador realmente exibido. Não invente uma versão mais específica.

Critério: o agente disponível conseguia trabalhar no workspace, consultar documentação, executar comandos, testar no navegador e operar Git/Vercel. O custo aceito é depender de validação externa, pois uma resposta convincente não comprova execução correta.

Não foram usados subagentes. O trabalho foi dividido em branches de funcionalidades, com verificações sequenciais; manter um único responsável evitou conflito de arquivos no escopo e no prazo desta entrega. `AGENTS.md` é um arquivo de instruções para agentes, não comprovação de vários agentes executados.

## Arquivos versionados

| Arquivo                                   | O que controla                               | Limite                                                                                   |
| ----------------------------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `AGENTS.md`                               | Pastas, segurança, nomes, commits e branches | Instruções orientam o agente; não substituem testes                                      |
| `.agents/skills/revisar-entrega/SKILL.md` | Procedimento para validar a entrega          | Precisa ser lido/invocado na revisão                                                     |
| `.codex/config.toml`                      | Endpoint opcional do MCP Context7            | O ambiente desta sessão já oferecia o conector; o arquivo não prova sua ativação isolada |
| `biome.json` e `tsconfig.json`            | Estilo/imports e contratos de tipo           | Não provam requisitos de produto                                                         |
| `.githooks/`                              | Checks antes do commit e padrão da mensagem  | Hooks locais podem ser pulados; a CI repete checks                                       |
| `.github/workflows/ci.yml`                | Validação automática de main e PRs           | Serviços externos reais requerem teste com as contas do dono                             |
| `docs/REQUISITOS.md`                      | Critérios de aceite e pendências             | Não declarar completo o que ainda precisa ser ativado                                    |

## Ferramentas efetivamente usadas

- Context7: documentação atual de Next.js e Supabase antes de implementar autenticação e handlers.
- Playwright: leitura do enunciado público no Notion e inspeção visual da aplicação; suíte `@playwright/test` para E2E local.
- GitHub: conector consultado para descobrir repositórios; a conta do dono foi identificada pelo GitHub CLI autenticado (`Jhowzxcv`), que forneceu o perfil e os repositórios corretos.
- Terminal/Node/npm/Git: instalação, tipos, build, testes, branches, commits e publicação.
- Vercel CLI: conferência da sessão, criação/vínculo de projeto e deploy.
- Lighthouse CLI: medição real do build de produção, em perfil mobile.

Uma skill de design disponível no ambiente orientou detalhes de foco, movimento reduzido e interação. Ela não foi copiada para este repositório; a skill própria de revisão é o artefato reproduzível da entrega. O perfil público do GitHub foi usado para os textos biográficos; não foram inventadas experiências. Não foi necessário incluir imagens geradas ou serviços de IA dentro do site.

## Como as regras foram aplicadas

As features foram desenvolvidas em `feature/portfolio-github` e `feature/dashboard-contato`. Cada uma foi validada antes de integrar em main. Os hooks executam Biome, TypeScript e Vitest; build e Playwright foram executados no terminal. A revisão final consulta a skill versionada e registra resultados e limites em `VALIDACAO.md`.

Exemplos de critérios verificáveis: cookie falso não abre dashboard; e-mail inválido não é gravado; falha de notificação não apaga mensagem; o mesmo envio em retry mantém a UUID; navegação entre home e projeto não consulta novamente a API da aplicação.

## Referências de configuração

O arquivo de MCP segue a estrutura documentada em [Model Context Protocol](https://learn.chatgpt.com/docs/extend/mcp). A estrutura de skill com `SKILL.md` está documentada em [Build skills](https://learn.chatgpt.com/docs/build-skills). Confiança no projeto e disponibilidade dos conectores dependem da configuração local.
