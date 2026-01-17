import { Injectable } from "@nestjs/common";
import type { MailgunClient } from "./client";

import { EmailGateway } from "../../../../domain/notification/email/ports/email-gateway";
import { EmailMessage } from "../../../../domain/notification/email/models/email-message";
import { EmailDelivery } from "../../../../domain/notification/email/models/email-delivery";

@Injectable()
export class MailgunEmailAdapter implements EmailGateway {
  private readonly providerName = "mailgun";

  constructor(private readonly mg: MailgunClient, private readonly domain: string) {}

  async send(message: EmailMessage): Promise<EmailDelivery> {
    try {
      const to = message.to.map((r) => r.toRfc2822()).join(", ");

      const resp = await this.mg.messages.create(this.domain, {
        from: message.from.toRfc2822(),
        to,
        subject: message.content.subject,
        text: message.content.text ?? "",
        html: message.content.html,
        "h:Reply-To": message.replyTo?.toRfc2822(),
        "o:tag": message.tags.length ? message.tags : undefined,
      });

      return EmailDelivery.sent(this.providerName, resp.id);
    } catch (err: any) {
      const msg = err?.message ? String(err.message) : "Unknown Mailgun error";
      return EmailDelivery.failed(this.providerName, msg);
    }
  }
}
