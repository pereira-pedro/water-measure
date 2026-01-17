import { z } from "zod";
import { createMailgunClient } from "./client";

const schema = z.object({
  MAILGUN_API_KEY: z.string().min(1),
  MAILGUN_DOMAIN: z.string().min(1),
  MAILGUN_BASE_URL: z.string().optional(), // e.g. https://api.eu.mailgun.net
});

export type MailgunConfig = z.infer<typeof schema>;

export function loadMailgunConfig(env: NodeJS.ProcessEnv): MailgunConfig {
  return schema.parse(env);
}

export type MailgunClient = ReturnType<typeof createMailgunClient>;
