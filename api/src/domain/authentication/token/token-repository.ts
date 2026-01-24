import { AuthToken } from "./token";

export interface TokenRepository {
  create(token: AuthToken): Promise<AuthToken>;
  findByTokenHash(tokenHash: string): Promise<AuthToken | null>;
}

export const TOKEN_REPOSITORY = Symbol("TOKEN_REPOSITORY");
