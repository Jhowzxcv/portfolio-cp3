import { describe, expect, it } from 'vitest';
import { contactSchema, fieldErrors } from '../lib/validation';

const valid = {
  name: 'Pessoa Teste',
  email: 'teste@example.com',
  message: 'Gostaria de conversar sobre um projeto de desenvolvimento.',
};
describe('validação do contato', () => {
  it('aceita uma mensagem válida e remove espaços extras', () => {
    const result = contactSchema.parse({ ...valid, name: '  Pessoa Teste  ' });
    expect(result.name).toBe('Pessoa Teste');
  });
  it.each([
    ['name', ' ', 'nome'],
    ['email', 'email-invalido', 'e-mail'],
    ['message', 'Muito curta', '20 caracteres'],
  ])('rejeita %s inválido com mensagem específica', (field, value, fragment) => {
    const result = contactSchema.safeParse({ ...valid, [field]: value });
    expect(result.success).toBe(false);
    if (!result.success) expect(fieldErrors(result.error)[field]).toContain(fragment);
  });
  it('rejeita spam preenchido no honeypot', () => {
    expect(contactSchema.safeParse({ ...valid, website: 'https://spam.test' }).success).toBe(false);
  });
  it('limita mensagem longa', () => {
    expect(contactSchema.safeParse({ ...valid, message: 'a'.repeat(5001) }).success).toBe(false);
  });
});
