# Roteiro de entrevista · meta de 7min20s

Use como guia e adapte à sua fala. A gravação deve mostrar seu rosto e a tela o tempo todo. Não basta narrar estes tópicos sem mostrar o projeto. Faça antes os testes reais de Supabase/Resend indicados em SUA-PARTE.md.

## 0:00–0:35 · Apresentação e site

Tela: home publicada. Mostre seu rosto em uma janela fixa da captura.

“Eu sou Jhonathan Dourado, estudante de Engenharia de Software na FIAP. Este é meu portfólio em React com Next.js. O objetivo foi apresentar meus projetos, receber contatos e permitir que eu administre mensagens e destaques. Os repositórios vêm da API do meu GitHub, sem cadastrar cada projeto à mão.”

Clique em um projeto, copie ou abra sua URL e atualize a página. Mostre o tema claro/escuro rapidamente.

## 0:35–1:45 · Stack e arquitetura

Tela: `docs/arquitetura.html` e árvore do editor.

“Separei as responsabilidades. Em app estão as rotas e os endpoints. Components contém a apresentação; hooks organiza o carregamento e o estado; services concentra GitHub, autenticação, banco e e-mail. Lib guarda tipos e validações compartilhadas. Assim, um componente de card não precisa conhecer a chave de um banco.”

“Na listagem, useProjects consulta minha API. O servidor busca o GitHub e mantém cache por cinco minutos. O contexto preserva os dados ao trocar de rota. Os destaques vêm do Supabase, então uma mudança no painel vale para todos os visitantes.”

“No contato, valido no navegador e de novo no servidor. A função SQL salva a mensagem antes da chamada ao Resend. Se o e-mail falhar, não perco o contato: o aviso fica pendente e pode ser reenviado no painel.”

## 1:45–3:15 · Comparações e escolhas

Tela: `docs/DECISOES.md`. Escolha linhas da tabela, sem ler todas.

“Comparei Next.js com React/Vite mais um roteador e uma API separada. Escolhi Next para ter páginas e funções de servidor no mesmo deploy Vercel. Aceitei aprender as regras de componentes cliente e servidor.”

“Para estilo, considerei Tailwind e uma biblioteca pronta. Usei CSS próprio e uma organização inspirada nas documentações de Java, Spring, Docker e Kubernetes: navegação lateral, conteúdo central e seções com títulos diretos. Em troca, fiquei responsável por responsividade, foco e contraste. No celular, o menu usa dialog nativo. Não incluí uma cena 3D porque ela era opcional e priorizei a leitura e a performance.”

“Para dados, considerei Firebase e um backend próprio. Supabase reuniu PostgreSQL e autenticação. Perco independência de fornecedor e preciso configurar o serviço. O Resend foi escolhido para enviar pelo servidor, mantendo a chave privada fora do navegador. A mensagem no banco e o e-mail são operações separadas; por isso tratei falha e reenvio.”

“Usei fetch, cache do Next e contexto em vez de TanStack Query porque o fluxo público é pequeno. É menos uma dependência, mas a invalidação é mais simples: o cache da API pode levar até um minuto para mostrar novos destaques.”

## 3:15–4:10 · Dashboard e segurança

Tela: em janela anônima abra `/dashboard`; depois entre na sua sessão para mostrar uma mensagem.

“Sem autenticação, a página redireciona para login. No servidor, o token é verificado pelo Supabase, e só o UUID do proprietário entra. As APIs privadas repetem essa checagem. Não usei localStorage como autenticação: a sessão fica em cookie HttpOnly, SameSite estrito e seguro em produção.”

Mostre marcar como respondida e selecionar um destaque. Não exiba senha nem variáveis privadas.

“A sessão expira em até uma hora e exige novo login. As tabelas não têm acesso direto liberado para o visitante; o backend usa a chave privada somente no servidor.”

## 4:10–5:40 · Harness de IA

Tela: seletor do modelo, `AGENTS.md`, skill, configuração MCP e hooks.

“Usei o Codex desktop com o modelo que está indicado aqui no seletor [diga o nome real]. Escolhi trabalhar com o agente disponível porque ele podia editar o projeto, consultar documentação e executar testes. Eu continuo responsável por compreender e revisar o resultado.”

“O harness começa neste AGENTS.md: ele define as pastas, o padrão de nomes, as regras de segurança, os commits e a estratégia de branches. A skill revisar-entrega transforma a revisão em passos reproduzíveis. O MCP Context7 foi usado para consultar a documentação atual de Next e Supabase. O arquivo de configuração fica versionado, sem credenciais.”

“Usei um agente principal, sem subagentes, para manter a edição e a validação concentradas neste escopo. Para transformar instrução em verificação, os hooks rodam Biome, checagem de tipos e testes antes de cada commit. O GitHub Actions repete as verificações e executa os testes de navegador.”

Mostre `docs/HARNESS.md`, que registra o uso real. Não diga que um arquivo de configuração prova que um conector ou agente foi executado.

## 5:40–6:40 · Testes e performance

Tela: saída de `npm test`, relatório Playwright e relatório Lighthouse da entrega.

“Os testes cobrem validação por campo, rejeição de token falso e de usuário que não é o dono, além de falhas de banco e de notificação. Nos testes de navegador, verifico desktop e mobile, URL direta de projeto, refresh, tema persistente, erro e lista vazia da API, bloqueio sem login e botão de envio.”

“O Lighthouse foi medido no build de produção em perfil mobile. Aqui está o resultado real, com a URL e as condições da medição. Essa nota não é uma promessa de desempenho em qualquer rede.”

Mostre a nota do relatório atual. Os testes com mocks validam os cenários previstos, não provam que seu e-mail real chegou; só afirme isso após conferir a caixa de entrada.

## 6:40–7:20 · Git e deploy

Tela: `git log --oneline --graph --all` e projeto Vercel.

“Usei GitHub Flow, com branch por funcionalidade e Conventional Commits. Aqui estão as branches de portfólio e de dashboard, com integrações reais na main. Uma mudança passa por implementação, hooks, testes e build; após o merge e push, a integração Git da Vercel faz a publicação. A CI registra a validação, e previews permitem conferir mudanças.”

“O histórico mostra as datas reais de construção. O projeto foi feito com apoio de IA, com instruções versionadas e resultados de testes verificáveis. O principal cuidado foi garantir que a interface pública fosse leve e que dados privados fossem protegidos no servidor.”

Finalize antes de 8 minutos. Publique como não listado e confira se o link abre sem a sua conta.
