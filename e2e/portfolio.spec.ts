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
