import { Inject, Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { AuthToken } from "../../../../domain/authentication/token/token";
import { TOKEN_REPOSITORY, TokenRepository } from "../../../../domain/authentication/token/token-repository";
import { CreateTokenCommand } from "../commands/create-token.command";

export type CreateTokenResult = {
  token: string;
  expiresAt: Date;
  scope: string;
  userId: string;
};

@Injectable()
export class CreateTokenHandler {
  constructor(@Inject(TOKEN_REPOSITORY) private readonly tokenRepository: TokenRepository) {}

  async execute(cmd: CreateTokenCommand): Promise<CreateTokenResult> {
    const ttlSeconds = cmd.ttlMinutes * 60;
    const secret = this.getSecret();
    const tokenValue = jwt.sign(
      {
        scope: cmd.scope,
      },
      secret,
      { expiresIn: ttlSeconds, subject: cmd.userId },
    );
    const expiresAt = new Date(Date.now() + ttlSeconds * 1000);

    const token = AuthToken.fromRawToken({
      userId: cmd.userId,
      rawToken: tokenValue,
      secret,
      scope: cmd.scope,
      expiresAt,
    });

    const created = await this.tokenRepository.create(token);
    return {
      token: tokenValue,
      expiresAt: created.expiresAt,
      scope: created.scope,
      userId: created.userId,
    };
  }

  private getSecret(): string {
    const secret = process.env.AUTH_TOKEN_SECRET;
    if (!secret) {
      throw new Error("AUTH_TOKEN_SECRET is not configured");
    }

    return secret;
  }
}
