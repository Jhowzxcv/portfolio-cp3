'use client';

import { ArrowUpRight, LoaderCircle } from 'lucide-react';
import { type FormEvent, useRef, useState } from 'react';
import { contactSchema, fieldErrors } from '@/lib/validation';

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; ok: boolean } | null>(null);
  const lock = useRef(false);
  const submission = useRef<{ id: string; payload: string } | null>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lock.current) return;
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form));
    const parsed = contactSchema.safeParse(raw);
    setFeedback(null);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }
    setErrors({});
    lock.current = true;
    setSending(true);
    const payload = JSON.stringify(parsed.data);
    if (!submission.current || submission.current.payload !== payload) {
      submission.current = { id: crypto.randomUUID(), payload };
    }
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': submission.current.id },
        body: payload,
        signal: AbortSignal.timeout(30000),
      });
      const body = await response.json();
      if (!response.ok) {
        if (body.fields) setErrors(body.fields);
        throw new Error(body.error || 'O envio falhou. Tente novamente.');
      }
      setFeedback({ ok: true, message: body.message });
      form.reset();
      submission.current = null;
    } catch (error) {
      setFeedback({
        ok: false,
        message:
          error instanceof Error && error.name !== 'TimeoutError'
            ? error.message
            : 'Não foi possível confirmar o envio. Tente novamente; sua mensagem não será duplicada.',
      });
    } finally {
      lock.current = false;
      setSending(false);
    }
  }
  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-row">
        {(['name', 'email'] as const).map((field) => (
          <div className="field" key={field}>
            <label htmlFor={field}>{field === 'name' ? 'Seu nome' : 'Seu e-mail'}</label>
            <input
              id={field}
              name={field}
              type={field === 'email' ? 'email' : 'text'}
              autoComplete={field}
              maxLength={field === 'name' ? 100 : 254}
              placeholder={field === 'name' ? 'Como posso te chamar?' : 'voce@exemplo.com'}
              aria-invalid={!!errors[field]}
              aria-describedby={errors[field] ? `${field}-error` : undefined}
              required
            />
            {errors[field] && (
              <span className="field-error" id={`${field}-error`}>
                {errors[field]}
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="field">
        <label htmlFor="message">O que vamos construir?</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          minLength={20}
          maxLength={5000}
          placeholder="Me conte sobre sua ideia, projeto ou oportunidade…"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : 'message-hint'}
          required
        />
        <span className="field-hint" id="message-hint">
          Entre 20 e 5.000 caracteres.
        </span>
        {errors.message && (
          <span className="field-error" id="message-error">
            {errors.message}
          </span>
        )}
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form-bottom">
        <span>Seus dados são usados só para responder.</span>
        <button type="submit" className="button primary" disabled={sending}>
          {sending ? (
            <>
              Enviando <LoaderCircle className="spin" size={17} />
            </>
          ) : (
            <>
              Enviar mensagem <ArrowUpRight size={17} />
            </>
          )}
        </button>
      </div>
      {feedback && (
        <p className={`feedback ${feedback.ok ? 'success' : 'failure'}`} role="status">
          {feedback.message}
        </p>
      )}
    </form>
  );
}
