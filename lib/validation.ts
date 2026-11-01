import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Informe seu nome com pelo menos 2 caracteres.')
    .max(100, 'Use até 100 caracteres.'),
  email: z.email('Informe um e-mail válido.').max(254, 'E-mail muito longo.'),
  message: z
    .string()
    .trim()
    .min(20, 'Escreva uma mensagem com pelo menos 20 caracteres.')
    .max(5000, 'Use até 5.000 caracteres.'),
  website: z.string().max(0, 'Envio não permitido.').optional(),
});
export type ContactInput = z.infer<typeof contactSchema>;
export function fieldErrors(error: z.ZodError) {
  return Object.fromEntries(error.issues.map((issue) => [String(issue.path[0]), issue.message]));
}
export const loginSchema = z.object({
  email: z.email('Informe um e-mail válido.'),
  password: z.string().min(1, 'Informe sua senha.').max(200),
});
