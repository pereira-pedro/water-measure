import { Inject, Injectable } from "@nestjs/common";
import { EmailDelivery } from "../../../../domain/notification/email/models/email-delivery";
import { EmailMessage } from "../../../../domain/notification/email/models/email-message";
import { EmailRecipient } from "../../../../domain/notification/email/models/email-recipient";
import { EMAIL_GATEWAY, EmailGateway } from "../../../../domain/notification/email/ports/email-gateway";
import { SendOtpEmailCommand } from "../../otp/commands/send-email-command";
import { CacheKey } from "../../../../domain/cache/models/cache-key";
import { CACHE_GATEWAY, CacheGateway } from "src/domain/cache/ports/cache-gateway";
import { GetUserByEmailHandler } from "../../user/handlers/get-user-by-email.handler";
import { EmailNotFoundException } from "src/domain/authentication/exceptions/email-not-found.exception";

@Injectable()
export class SendOtpEmailHandler {
  constructor(
    @Inject(EMAIL_GATEWAY) private readonly emailGateway: EmailGateway,
    @Inject(CACHE_GATEWAY) private readonly cacheGateway: CacheGateway,
    private readonly getUserByEmailHandler: GetUserByEmailHandler,
  ) {}

  async execute(cmd: SendOtpEmailCommand): Promise<EmailDelivery> {
    const user = await this.getUserByEmailHandler.execute({ email: cmd.email });
    if (!user) {
      throw new EmailNotFoundException();
    }

    const from = EmailRecipient.create(process.env.MAIL_FROM_ADDRESS ?? "", process.env.MAIL_FROM_NAME ?? "");
    const to = [EmailRecipient.create(cmd.email)];
    const otp = this.generateOtp();

    this.cacheOtp(cmd.email, otp);

    const message = EmailMessage.create({
      from,
      to,
      subject: "OTP Verification code inside",
      html: "<h1>Hello</h1><p>This is your one-time password: " + otp + "</p>",
      tags: ["authentication-otp"],
      idempotencyKey: `authentication-otp:${cmd.email}`,
    });

    return this.emailGateway.send(message);
  }

  private generateOtp(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  private cacheOtp(email: string, otp: string): void {
    const key = CacheKey.fromParts("authentication-otp", email);
    this.cacheGateway.set(key, otp, { ttlSeconds: 300 });
  }
}
