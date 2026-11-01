# Instruções para IA — portfólio CP3

## Objetivo
Portfólio pessoal de Jhonathan Dourado em React/Next.js. Seguir os requisitos em docs/REQUISITOS.md. Não inventar experiências, projetos, provas de envio ou resultados de testes.

## Arquitetura
- app/: rotas, layouts e handlers HTTP; sem chamadas de banco em componentes visuais.
- components/: apresentação reutilizável, PascalCase; módulos de dashboard somente na rota privada.
- services/: GitHub, banco, autenticação, e-mail; segredos apenas no servidor.
- hooks/: lógica de carregamento reutilizável; nomes começando com use.
- lib/: tipos e validação pura compartilhada entre navegador e servidor.
- tests/: testes de regras e integração; e2e/: navegação e proteção reais.

## Fluxo obrigatório
1. Descrever critério de aceite e escolher uma feature por branch feature/<nome> (fix/ e docs/ também aceitos).
2. Implementar a menor mudança coerente. Não reverter trabalho do usuário.
3. Executar npm run lint, npm run typecheck, npm test e npm run build. Rodar E2E se alterar formulários, rotas ou autorização.
4. Commits Conventional Commits em português: feat:, fix:, test:, docs:, chore:.
5. Integrar a branch validada em main; nunca fabricar datas de commits. Push em main deve acionar o deploy pela integração Git da Vercel, quando configurada.

## Regras de produto e segurança
- Mensagens específicas por campo, botão bloqueado no envio, feedback fiel ao backend.
- Login não é localStorage. Verificar usuário no servidor, em cada rota privada e API administrativa.
- Chaves de serviço nunca usam prefixo NEXT_PUBLIC_, logs ou repositório.
- Dados GitHub vêm da API, com cache, timeout e estados loading/error/empty.
- Manter teclado, contraste, foco, tema persistente e prefers-reduced-motion.
- Não declarar banco/e-mail/deploy operacionais sem credenciais e verificação real.
- Histórico deve refletir o trabalho realizado; é proibido retroagir commits para simular trabalho anterior.

## Harness
Ler .agents/skills/revisar-entrega/SKILL.md antes da validação final. Consultar documentação atual com Context7; a configuração opcional em .codex/config.toml não prova que um conector foi usado. Registrar ferramentas efetivamente usadas em docs/HARNESS.md.
