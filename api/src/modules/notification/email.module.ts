import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { EMAIL_GATEWAY } from "../../domain/notification/email/ports/email-gateway";
import { SendEmailHandler } from "../../application/notification/email/handlers/send-email-handler";

import { MailgunEmailAdapter } from "../../infrastructure/notification/email/mailgun/adapter";
import { createMailgunClient, type MailgunClient } from "../../infrastructure/notification/email/mailgun/client";
import { loadMailgunConfig, type MailgunConfig } from "../../infrastructure/notification/email/mailgun/config";
import { MAILGUN_CLIENT, MAILGUN_CONFIG } from "../../infrastructure/notification/email/mailgun/tokens";

@Module({
  imports: [ConfigModule],
  providers: [
    SendEmailHandler,
    {
      provide: MAILGUN_CONFIG,
      inject: [ConfigService],
      useFactory: (cfg: ConfigService): MailgunConfig => {
        // idiomatic: read directly from process.env via ConfigService
        // (ConfigModule reads process.env by default unless configured otherwise)
        return loadMailgunConfig({
          MAILGUN_API_KEY: cfg.get<string>("MAILGUN_API_KEY"),
          MAILGUN_DOMAIN: cfg.get<string>("MAILGUN_DOMAIN"),
          MAILGUN_BASE_URL: cfg.get<string>("MAILGUN_BASE_URL"),
        } as any);
      },
    },
    {
      provide: MAILGUN_CLIENT,
      inject: [MAILGUN_CONFIG],
      useFactory: (c: MailgunConfig): MailgunClient => {
        return createMailgunClient({
          apiKey: c.MAILGUN_API_KEY,
          baseUrl: c.MAILGUN_BASE_URL,
        });
      },
    },
    {
      provide: EMAIL_GATEWAY,
      inject: [MAILGUN_CLIENT, MAILGUN_CONFIG],
      useFactory: (mg: MailgunClient, c: MailgunConfig) => {
        return new MailgunEmailAdapter(mg, c.MAILGUN_DOMAIN);
      },
    },
  ],
  exports: [SendEmailHandler, EMAIL_GATEWAY],
})
export class EmailModule {}
