import { Injectable } from "@nestjs/common";
import { prisma } from "@acme/db";
import { AuthToken } from "../../../domain/authentication/token/token";
import { TokenRepository } from "../../../domain/authentication/token/token-repository";

@Injectable()
export class PrismaTokenRepository implements TokenRepository {
  async create(token: AuthToken): Promise<AuthToken> {
    const record = await prisma.authToken.create({
      data: {
        userId: token.userId,
        tokenHash: token.tokenHash,
        scope: token.scope,
        expiresAt: token.expiresAt,
      },
    });

    return toDomain(record);
  }

  async findByTokenHash(tokenHash: string): Promise<AuthToken | null> {
    const record = await prisma.authToken.findUnique({
      where: { tokenHash },
    });

    return record ? toDomain(record) : null;
  }
}

function toDomain(record: {
  id: string;
  userId: string;
  tokenHash: string;
  scope: string;
  createdAt: Date;
  expiresAt: Date;
  updatedAt: Date;
}): AuthToken {
  return AuthToken.create({
    id: record.id,
    userId: record.userId,
    tokenHash: record.tokenHash,
    scope: record.scope,
    createdAt: record.createdAt,
    expiresAt: record.expiresAt,
    updatedAt: record.updatedAt,
  });
}
