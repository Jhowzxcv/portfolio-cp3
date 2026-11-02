import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({ cookie: vi.fn(), user: vi.fn() }));
vi.mock('next/headers', () => ({ cookies: async () => ({ get: mocks.cookie }) }));
vi.mock('@supabase/supabase-js', () => ({
  createClient: () => ({ auth: { getUser: mocks.user } }),
}));

import { currentOwner, validOrigin } from '../services/auth';

beforeEach(() => {
  vi.stubEnv('SUPABASE_URL', 'https://example.supabase.co');
  vi.stubEnv('SUPABASE_ANON_KEY', 'test');
  vi.stubEnv('OWNER_USER_ID', 'owner-id');
  mocks.cookie.mockReset();
  mocks.user.mockReset();
});
describe('autorização no servidor', () => {
  it('nega acesso sem cookie e nem consulta autenticação', async () => {
    expect(await currentOwner()).toBeNull();
    expect(mocks.user).not.toHaveBeenCalled();
  });
  it('nega token forjado ou expirado', async () => {
    mocks.cookie.mockReturnValue({ value: 'forged' });
    mocks.user.mockResolvedValue({ data: { user: null }, error: new Error('invalid') });
    expect(await currentOwner()).toBeNull();
  });
  it('nega usuário autenticado que não é o proprietário', async () => {
    mocks.cookie.mockReturnValue({ value: 'valid-token' });
    mocks.user.mockResolvedValue({ data: { user: { id: 'other-user' } }, error: null });
    expect(await currentOwner()).toBeNull();
  });
  it('libera somente o proprietário verificado pelo Supabase', async () => {
    mocks.cookie.mockReturnValue({ value: 'valid-token' });
    mocks.user.mockResolvedValue({ data: { user: { id: 'owner-id' } }, error: null });
    expect((await currentOwner())?.id).toBe('owner-id');
    expect(mocks.user).toHaveBeenCalledWith('valid-token');
  });
  it('rejeita requisição de alteração de outra origem', () => {
    expect(
      validOrigin(
        new Request('https://portfolio.test/api/admin', {
          headers: { origin: 'https://evil.test' },
        }),
      ),
    ).toBe(false);
    expect(
      validOrigin(
        new Request('https://portfolio.test/api/admin', {
          headers: { origin: 'https://portfolio.test' },
        }),
      ),
    ).toBe(true);
  });
});
