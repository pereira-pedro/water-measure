import * as crypto from "crypto";

export class AuthToken {
  private constructor(
    public readonly id: string | null,
    public readonly userId: string,
    public readonly tokenHash: string,
    public readonly scope: string,
    public readonly createdAt: Date,
    public readonly expiresAt: Date,
    public readonly updatedAt: Date
  ) {}

  static create(params: {
    id?: string | null;
    userId: string;
    tokenHash: string;
    scope?: string;
    createdAt?: Date;
    expiresAt: Date;
    updatedAt?: Date;
  }): AuthToken {
    const userId = params.userId.trim();
    if (!userId) {
      throw new Error("User id is required");
    }

    const tokenHash = params.tokenHash.trim();
    if (!tokenHash) {
      throw new Error("Token hash is required");
    }

    const scope = params.scope?.trim() ?? "default";
    const createdAt = params.createdAt ?? new Date();
    const expiresAt = params.expiresAt;
    const updatedAt = params.updatedAt ?? createdAt;

    if (expiresAt.getTime() <= createdAt.getTime()) {
      throw new Error("Token expiration must be after creation");
    }

    return new AuthToken(params.id ?? null, userId, tokenHash, scope, createdAt, expiresAt, updatedAt);
  }

  static fromRawToken(params: {
    id?: string | null;
    userId: string;
    rawToken: string;
    secret: string;
    scope?: string;
    createdAt?: Date;
    expiresAt: Date;
    updatedAt?: Date;
  }): AuthToken {
    return AuthToken.create({
      id: params.id,
      userId: params.userId,
      tokenHash: AuthToken.hashToken(params.rawToken, params.secret),
      scope: params.scope,
      createdAt: params.createdAt,
      expiresAt: params.expiresAt,
      updatedAt: params.updatedAt,
    });
  }

  static hashToken(rawToken: string, secret: string): string {
    const token = rawToken.trim();
    const pepper = secret.trim();
    if (!token) {
      throw new Error("Token value is required");
    }
    if (!pepper) {
      throw new Error("Token hash secret is required");
    }

    return crypto.createHash("sha256").update(`${token}.${pepper}`).digest("hex");
  }
}
