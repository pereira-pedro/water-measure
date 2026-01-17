
export class EmailRecipient {
  private constructor(public readonly address: string, public readonly name?: string) {}

  static create(address: string, name?: string): EmailRecipient {
    const normalized = address.trim().toLowerCase();
    // Keep validation simple; infra can do deeper checks if needed.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      throw new Error(`Invalid email address: ${address}`);
    }
    return new EmailRecipient(normalized, name?.trim() || undefined);
  }

  toRfc2822(): string {
    return this.name ? `${this.name} <${this.address}>` : this.address;
  }
}
