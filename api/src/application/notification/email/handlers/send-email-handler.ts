import { Inject, Injectable } from "@nestjs/common";
import { EMAIL_GATEWAY, EmailGateway } from "../../../../domain/notification/email/ports/email-gateway";
import { EmailRecipient } from "../../../../domain/notification/email/models/email-recipient";
import { EmailMessage } from "../../../../domain/notification/email/models/email-message";
import { EmailDelivery } from "../../../../domain/notification/email/models/email-delivery";
import { SendEmailCommand } from "../commands/send-email-command";

@Injectable()
export class SendEmailHandler {
  constructor(@Inject(EMAIL_GATEWAY) private readonly gateway: EmailGateway) {}

  async execute(cmd: SendEmailCommand): Promise<EmailDelivery> {
    const from = EmailRecipient.create(cmd.from.email, cmd.from.name);
    const to = cmd.to.map((r) => EmailRecipient.create(r.email, r.name));
    const replyTo = cmd.replyTo ? EmailRecipient.create(cmd.replyTo.email, cmd.replyTo.name) : undefined;
    const message = EmailMessage.create({
      from,
      to,
      subject: cmd.subject,
      text: cmd.text,
      html: cmd.html,
      replyTo,
      tags: cmd.tags,
      idempotencyKey: cmd.idempotencyKey,
    });

    return this.gateway.send(message);
  }
}
