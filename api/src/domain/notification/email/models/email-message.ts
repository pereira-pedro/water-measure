import { EmailRecipient } from "./email-recipient";

export type EmailContent = {
  subject: string;
  text?: string;
  html?: string;
};

export type EmailAttachment = {
  filename: string;
  contentType?: string;
  // Could be Buffer, stream, or remote URL. Keep abstract in domain if you can.
  content: Buffer;
};

export class EmailMessage {
  private constructor(
    public readonly from: EmailRecipient,
    public readonly to: EmailRecipient[],
    public readonly content: EmailContent,
    public readonly replyTo?: EmailRecipient,
    public readonly attachments: EmailAttachment[] = [],
    public readonly tags: string[] = [],
    public readonly idempotencyKey?: string
  ) {}

  static create(params: {
    from: EmailRecipient;
    to: EmailRecipient[];
    subject: string;
    text?: string;
    html?: string;
    replyTo?: EmailRecipient;
    attachments?: EmailAttachment[];
    tags?: string[];
    idempotencyKey?: string;
  }): EmailMessage {
    if (!params.to?.length) {
      throw new Error("EmailMessage must have at least one recipient");
    }
    if (!params.subject?.trim()) {
      throw new Error("EmailMessage subject is required");
    }
    if (!params.text && !params.html) {
      throw new Error("EmailMessage must have text or html");
    }

    return new EmailMessage(
      params.from,
      params.to,
      { subject: params.subject.trim(), text: params.text, html: params.html },
      params.replyTo,
      params.attachments ?? [],
      params.tags ?? [],
      params.idempotencyKey
    );
  }
}
