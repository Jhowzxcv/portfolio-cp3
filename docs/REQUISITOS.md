# O que a entrega pede

Fonte: [enunciado CP3 no Notion](https://cherry-client-b8f.notion.site/CP3-Portfolio-Stack-e-Harness-Engineering-3fe911d84e0d80f7bb6dec712e6d904a). Conferido em 03/11/2026, horário de São Paulo. O enunciado informa prazo 03/11, sem horário de fechamento visível.

Entrega individual no Teams com três URLs: repositório público, aplicação na Vercel e vídeo não listado no YouTube. IA é permitida e esperada, mas você precisa compreender o código e justificar o processo.

| Item obrigatório                                       | Implementação preparada                                               | Condição para fechar                                       |
| ------------------------------------------------------ | --------------------------------------------------------------------- | ---------------------------------------------------------- |
| Navegação por projeto e página para caminhos inválidos | App Router, `/projetos/[slug]`, 404 e recuperação de erro             | Navegação e refresh testados                               |
| Feedback de carregamento, falha e ausência de dados    | Skeletons, estados vazios, retry, spinner e botão bloqueado           | Testes desktop e mobile                                    |
| Projetos obtidos automaticamente do GitHub             | Serviço paginado; cards com descrição, linguagem e atualização        | API pública verificada                                     |
| Contato validado que grava e notifica por e-mail       | Zod, função SQL, Supabase e Resend                                    | Ativar contas/chaves e testar recebimento real             |
| Administração privada                                  | Autorização no servidor, mensagens respondidas e escolha de destaques | Ativar Supabase e usuário proprietário                     |
| Tema lembrado entre visitas                            | Atributo de tema + localStorage                                       | Persistência testada                                       |
| Interface própria, reutilizável e adaptável            | CSS responsivo e componentes compartilhados                           | Desktop e celular verificados; 3D é opcional               |
| Performance mobile de ao menos 80                      | Rotas separadas, cache, skeleton e arte CSS leve                      | Relatório Lighthouse real em VALIDACAO.md                  |
| Testes do formulário e da proteção de acesso           | Vitest e Playwright                                                   | Resultados em VALIDACAO.md                                 |
| Aplicação acessível e publicação após push             | Vercel e integração Git em main                                       | Conferir deploy e vínculo Git                              |
| Versionamento padronizado e branches por feature       | Conventional Commits, hooks, branches e merges reais                  | Histórico iniciado nesta sessão; não cobre dias anteriores |
| Organização e estilo de código verificáveis            | app/components/hooks/services/lib, TypeScript, Biome e CI             | README e AGENTS descrevem as regras                        |

Também são exigidos README com execução/tecnologias e exemplo de variáveis, mantendo segredos fora do Git. O repositório contém esses arquivos.

O vídeo tem limite de 8 minutos, com câmera e tela durante toda a gravação. Deve demonstrar: arquitetura e fluxo de dados; alternativas e perdas aceitas nas escolhas técnicas; ferramenta/modelo de IA, instruções, skills, conectores e organização do trabalho. Mostrar arquivos reais e explicar o trajeto branch → testes → main → deploy. O roteiro preparado dura cerca de 7min20s.

O requisito de commits distribuídos ao longo do prazo não pode ser recuperado no último dia. Os commits foram registrados nas datas reais; não há histórico fabricado.
