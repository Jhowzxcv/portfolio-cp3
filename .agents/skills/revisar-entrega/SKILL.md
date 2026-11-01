---
name: revisar-entrega
description: Valida o portfólio CP3 antes de integrar uma feature ou preparar a demonstração.
---

1. Conferir docs/REQUISITOS.md e AGENTS.md.
2. Executar lint, typecheck, testes unitários e build. Não registrar sucesso de comandos não executados.
3. Se alterar formulário/autenticação/rotas, executar Playwright e conferir dashboard sem sessão, erros por campo, 404 e refresh em projeto.
4. Conferir que segredos estão fora do Git e que banco e e-mail falham explicitamente sem configuração.
5. Conferir mobile/desktop, tema persistente e limite de requisições GitHub. Não usar localStorage como autenticação ou banco compartilhado.
6. Atualizar docs/VALIDACAO.md com evidências reais e limitações. Lighthouse mobile precisa medir >=80; não estimar a nota.
7. Integrar a feature com commit descritivo. Nunca alterar datas para simular histórico anterior.
