export class User {
  private constructor(
    public readonly id: string | null,
    public readonly fullName: string,
    public readonly email: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  static create(params: {
    id?: string | null;
    fullName?: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
  }): User {
    const fullName = params.fullName?.trim() ?? "";
    const email = params.email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error(`Invalid email address: ${params.email}`);
    }

    const createdAt = params.createdAt ?? new Date();
    const updatedAt = params.updatedAt ?? createdAt;

    return new User(params.id ?? null, fullName, email, createdAt, updatedAt);
  }
}
