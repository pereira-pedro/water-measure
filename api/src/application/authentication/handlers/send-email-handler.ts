import { Inject, Injectable } from "@nestjs/common";
import { EmailDelivery } from "../../../domain/notification/email/models/email-delivery";
import { EmailMessage } from "../../../domain/notification/email/models/email-message";
import { EmailRecipient } from "../../../domain/notification/email/models/email-recipient";
import { EMAIL_GATEWAY, EmailGateway } from "../../../domain/notification/email/ports/email-gateway";
import { SendOtpEmailCommand } from "../commands/otp/send-email-command";

@Injectable()
export class SendOtpEmailHandler {
  constructor(@Inject(EMAIL_GATEWAY) private readonly gateway: EmailGateway) {}

  async execute(cmd: SendOtpEmailCommand): Promise<EmailDelivery> {
    const from = EmailRecipient.create("no-reply@yourdomain.com", "Your App");
    const to = [EmailRecipient.create(cmd.to.email, cmd.to.name)];
    const message = EmailMessage.create({
      from,
      to,
      subject: "Welcome!",
      html: "<h1>Hello</h1><p>Welcome aboard.</p>",
      tags: ["welcome"],
      idempotencyKey: `welcome:${cmd.to.email}`,
    });

    return this.gateway.send(message);
  }
}
