# Só o que depende de você

O código do site, o SQL, os testes, o repositório e o roteiro estão preparados. Para encerrar a entrega, faltam as contas do banco/e-mail e a sua apresentação em vídeo.

## 1. Ativar Supabase e Resend

1. Entre em https://supabase.com/dashboard e crie um projeto. Guarde a senha do banco em seu gerenciador; ela não vai no código deste projeto.
2. No SQL Editor, cole e execute o conteúdo de `supabase/schema.sql`.
3. Em Authentication, crie seu usuário com e-mail e senha e confirme o e-mail. Copie o UUID desse usuário para `OWNER_USER_ID`. Desative cadastro público se não for usá-lo.
4. Nas configurações de API, copie a URL do projeto, a chave pública `anon` (ou publishable) e a chave privada `service_role` (ou secret). Elas correspondem a `SUPABASE_URL`, `SUPABASE_ANON_KEY` e `SUPABASE_SERVICE_ROLE_KEY`. A chave privada só entra nas variáveis de servidor.
5. Entre em https://resend.com, crie sua conta e uma API key com permissão de envio. Essa é `RESEND_API_KEY`.
6. Para apresentar sem comprar domínio, use `CONTACT_FROM=Portfolio <onboarding@resend.dev>` e `CONTACT_TO` com o mesmo e-mail da sua conta Resend. Esse remetente de teste só pode entregar ao dono da conta. Para outros destinatários, verifique um domínio no Resend e ajuste o remetente.
7. Abra o projeto `portfolio-cp3` em https://vercel.com/dashboard → Settings → Environment Variables. Cadastre as variáveis abaixo para Production e, se quiser, Preview. Faça Redeploy depois.

```text
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
OWNER_USER_ID
RESEND_API_KEY
CONTACT_FROM
CONTACT_TO
```

Não precisa de token do GitHub para os projetos públicos. `GITHUB_USERNAME` já usa `Jhowzxcv` por padrão. Para desenvolvimento local, use `.env.local`; ele está ignorado no Git. Não envie chaves por chat, vídeo ou commit.

Após configurar, envie uma mensagem real para você pelo site, confira a caixa de entrada e `/dashboard`, marque como respondida, mude os destaques e confirme em janela anônima após atualizar. Faça logout e confira que `/dashboard` pede login. Esses passos verificam os serviços reais, que não estavam disponíveis durante os testes locais.

## 2. Gravar a sua explicação

Use `docs/ROTEIRO-VIDEO.md` e abra `docs/arquitetura.html` no navegador para mostrar o fluxo. Capture tela e webcam simultaneamente. Seu rosto precisa ficar visível durante toda a gravação. Dure menos de 8 minutos e publique no YouTube como **não listado**.

Antes de gravar: leia o roteiro, abra os arquivos citados, confirme o nome do modelo no seletor do Codex e esconda arquivos/variáveis com segredos. Não fale que e-mail/login estão operacionais até verificar suas contas.

## 3. Entregar no Teams

Copie `docs/ENTREGA.md`, acrescente o link do seu vídeo e envie os três links na tarefa. Teste o acesso em janela anônima antes. O Notion indica 03/11; confira no Teams o horário de encerramento.

Você não precisa refazer o código. Se me avisar que o banco e o e-mail foram configurados, posso continuar as verificações técnicas. A gravação com seu rosto e a submissão no Teams ficam com você.
