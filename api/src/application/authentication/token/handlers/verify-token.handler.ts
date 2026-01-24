import { Inject, Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { AuthToken } from "../../../../domain/authentication/token/token";
import { TOKEN_REPOSITORY, TokenRepository } from "../../../../domain/authentication/token/token-repository";
import { VerifyTokenCommand } from "../commands/verify-token.command";

export type VerifyTokenResult = {
  isValid: boolean;
  token?: AuthToken;
};

@Injectable()
export class VerifyTokenHandler {
  constructor(@Inject(TOKEN_REPOSITORY) private readonly tokenRepository: TokenRepository) {}

  async execute(cmd: VerifyTokenCommand): Promise<VerifyTokenResult> {
    const tokenValue = cmd.token.trim();
    const secret = this.getSecret();
    if (!this.isSignatureValid(tokenValue, secret)) {
      return { isValid: false };
    }

    const tokenHash = AuthToken.hashToken(tokenValue, secret);
    const token = await this.tokenRepository.findByTokenHash(tokenHash);
    if (!token) {
      return { isValid: false };
    }

    if (token.expiresAt.getTime() <= Date.now()) {
      return { isValid: false };
    }

    return { isValid: true, token };
  }

  private isSignatureValid(token: string, secret: string): boolean {
    try {
      jwt.verify(token, secret);
      return true;
    } catch {
      return false;
    }
  }

  private getSecret(): string {
    const secret = process.env.AUTH_TOKEN_SECRET;
    if (!secret) {
      throw new Error("AUTH_TOKEN_SECRET is not configured");
    }

    return secret;
  }

}
