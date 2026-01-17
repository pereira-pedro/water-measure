// src/notification/domain/ports/email-gateway.ts
import { EmailMessage } from "../models/email-message";
import { EmailDelivery } from "../models/email-delivery";

/**
 * Domain port: the application talks to this interface.
 * Infrastructure will provide an implementation (Mailgun adapter).
 */
export interface EmailGateway {
  send(message: EmailMessage): Promise<EmailDelivery>;
}

/**
 * DI token to keep the application decoupled from concrete providers.
 */
export const EMAIL_GATEWAY = Symbol("EMAIL_GATEWAY");
