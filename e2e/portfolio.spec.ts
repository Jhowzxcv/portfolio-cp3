import { expect, test } from '@playwright/test';

const projects = [
  {
    id: 1,
    name: 'meu-projeto',
    description: 'Uma aplicação de teste integrada com a API.',
    language: 'TypeScript',
    html_url: 'https://github.com/test/meu-projeto',
    homepage: null,
    updated_at: '2026-10-28T12:00:00Z',
    stargazers_count: 2,
    topics: ['react'],
  },
];

test.beforeEach(async ({ page }) => {
  await page.route('**/api/projects', (route) =>
    route.fulfill({ json: { projects, featured: [1] } }),
  );
});
test('projeto tem rota própria, abre por URL e suporta refresh sem nova consulta na navegação', async ({
  page,
}) => {
  let requests = 0;
  page.on('request', (request) => {
    if (new URL(request.url()).pathname === '/api/projects') requests++;
  });
  await page.goto('/');
  await page.getByRole('heading', { name: 'meu-projeto', exact: true }).click();
  await expect(page).toHaveURL(/\/projetos\/meu-projeto/);
  await expect(page.getByRole('heading', { name: 'meu-projeto', exact: true })).toBeVisible();
  expect(requests).toBe(1);
  await page.reload();
  await expect(page.getByRole('heading', { name: 'meu-projeto', exact: true })).toBeVisible();
  expect(requests).toBe(2);
});
test('validação específica do formulário evita envio inválido', async ({ page }) => {
  let sent = false;
  await page.route('**/api/contact', (route) => {
    sent = true;
    return route.fulfill({ json: {} });
  });
  await page.goto('/#contato');
  await page.getByLabel('Seu nome').fill('A');
  await page.getByLabel('Seu e-mail').fill('invalido');
  await page.getByLabel('O que vamos construir?').fill('curta');
  await page.getByRole('button', { name: 'Enviar mensagem' }).click();
  await expect(page.getByText('Informe um e-mail válido.', { exact: true })).toBeVisible();
  await expect(page.getByText('Escreva uma mensagem com pelo menos 20 caracteres.')).toBeVisible();
  expect(sent).toBe(false);
});
test('tema persiste e layout não transborda', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Ativar tema claro' }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
});
test('rota inexistente mostra página amigável', async ({ page }) => {
  const response = await page.goto('/pagina-que-nao-existe');
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole('heading', { name: 'Essa rota ainda não foi construída.' }),
  ).toBeVisible();
});

test('dashboard sem login redireciona e API privada rejeita leitura e alteração', async ({
  page,
  request,
}) => {
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole('heading', { name: 'Bem-vindo de volta.' })).toBeVisible();
  expect((await request.get('/api/admin')).status()).toBe(401);
  expect(
    (await request.patch('/api/admin', { data: { action: 'feature', ids: [] } })).status(),
  ).toBe(401);
});
test('dashboard também rejeita cookie forjado', async ({ page, context }) => {
  await context.addCookies([
    { name: 'portfolio-owner', value: 'token-forjado', domain: '127.0.0.1', path: '/' },
  ]);
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/\/login$/);
});
test('API indisponível mostra erro recuperável e lista vazia tem feedback próprio', async ({
  page,
}) => {
  await page.route('**/api/projects', (route) =>
    route.fulfill({ status: 503, json: { error: 'Limite de consultas atingido.' } }),
  );
  await page.goto('/#projetos');
  await expect(page.getByText('Limite de consultas atingido.')).toBeVisible();
  await page.route('**/api/projects', (route) =>
    route.fulfill({ json: { projects: [], featured: [] } }),
  );
  await page.getByRole('button', { name: 'Tentar novamente' }).click();
  await expect(page.getByRole('heading', { name: 'Nenhum projeto por aqui.' })).toBeVisible();
});
test('botão bloqueia envio duplicado e sucesso limpa os campos', async ({ page }) => {
  let requests = 0;
  let release: () => void = () => {};
  const pending = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route('**/api/contact', async (route) => {
    requests++;
    await pending;
    await route.fulfill({ status: 201, json: { message: 'Mensagem recebida!' } });
  });
  await page.goto('/#contato');
  await page.getByLabel('Seu nome').fill('Pessoa Teste');
  await page.getByLabel('Seu e-mail').fill('teste@example.com');
  await page
    .getByLabel('O que vamos construir?')
    .fill('Gostaria de conversar sobre um projeto de desenvolvimento.');
  await page.getByRole('button', { name: 'Enviar mensagem' }).click();
  await expect(page.getByRole('button', { name: 'Enviando' })).toBeDisabled();
  expect(requests).toBe(1);
  release();
  await expect(page.getByText('Mensagem recebida!', { exact: true })).toBeVisible();
  await expect(page.getByLabel('Seu nome')).toHaveValue('');
});
