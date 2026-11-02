import { beforeEach, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  configured: vi.fn(),
  rpc: vi.fn(),
  single: vi.fn(),
  notify: vi.fn(),
}));
vi.mock('../services/database', () => ({
  databaseConfigured: mocks.configured,
  database: () => ({
    rpc: mocks.rpc,
    from: () => ({ select: () => ({ eq: () => ({ single: mocks.single }) }) }),
  }),
}));
vi.mock('../services/email', () => ({ notifyOwner: mocks.notify }));

import { POST } from '../app/api/contact/route';

const payload = {
  name: 'Pessoa Teste',
  email: 'teste@example.com',
  message: 'Gostaria de conversar sobre um projeto de desenvolvimento.',
};
function request(data: unknown = payload) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}
beforeEach(() => {
  vi.clearAllMocks();
  mocks.configured.mockReturnValue(true);
  mocks.rpc.mockResolvedValue({ data: 'message-id', error: null });
  mocks.single.mockResolvedValue({
    data: { ...payload, id: 'message-id', email_status: 'pending' },
    error: null,
  });
  mocks.notify.mockResolvedValue(true);
});
it('valida novamente no servidor e não grava entrada inválida', async () => {
  const response = await POST(request({ ...payload, email: 'invalido' }));
  expect(response.status).toBe(400);
  expect((await response.json()).fields.email).toContain('e-mail');
  expect(mocks.rpc).not.toHaveBeenCalled();
});
it('não inventa sucesso sem banco configurado', async () => {
  mocks.configured.mockReturnValue(false);
  expect((await POST(request())).status).toBe(503);
  expect(mocks.notify).not.toHaveBeenCalled();
});
it('informa que mensagem salva tem e-mail pendente quando provedor falha', async () => {
  mocks.notify.mockResolvedValue(false);
  const response = await POST(request());
  expect(response.status).toBe(202);
  expect((await response.json()).message).toContain('pendente');
});
it('não envia e-mail se o limite persistente rejeita a gravação', async () => {
  mocks.rpc.mockResolvedValue({ data: null, error: { message: 'RATE_LIMIT' } });
  expect((await POST(request())).status).toBe(429);
  expect(mocks.notify).not.toHaveBeenCalled();
});
it('devolve erro quando banco falha e não aciona notificação', async () => {
  mocks.rpc.mockResolvedValue({ data: null, error: { message: 'database down' } });
  expect((await POST(request())).status).toBe(503);
  expect(mocks.notify).not.toHaveBeenCalled();
});
