export type SendEmailCommand = {
  from: { email: string; name?: string };
  to: Array<{ email: string; name?: string }>;
  subject: string;
  text?: string;
  html?: string;
  replyTo?: { email: string; name?: string };
  tags?: string[];
  idempotencyKey?: string;
};
