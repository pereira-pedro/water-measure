
export type EmailDeliveryStatus = "SENT" | "FAILED";

export class EmailDelivery {
  private constructor(
    public readonly status: EmailDeliveryStatus,
    public readonly provider: string,
    public readonly providerMessageId?: string,
    public readonly sentAt?: Date,
    public readonly errorMessage?: string
  ) {}

  static sent(provider: string, providerMessageId?: string): EmailDelivery {
    return new EmailDelivery("SENT", provider, providerMessageId, new Date());
  }

  static failed(provider: string, errorMessage: string): EmailDelivery {
    return new EmailDelivery("FAILED", provider, undefined, undefined, errorMessage);
  }
}
