import { Injectable } from "@nestjs/common";
import { prisma } from "@acme/db";
import { UserRepository } from "../../../domain/authentication/ports/user-repository";
import { User } from "../../../domain/authentication/models/user";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const record = await prisma.user.findUnique({ where: { id } });
    return record ? toDomain(record) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const normalized = email.trim().toLowerCase();
    const record = await prisma.user.findUnique({ where: { email: normalized } });
    return record ? toDomain(record) : null;
  }

  async create(user: User): Promise<User> {
    const record = await prisma.user.create({
      data: {
        fullName: user.fullName,
        email: user.email,
      },
    });

    return toDomain(record);
  }

  async update(user: User): Promise<User> {
    if (!user.id) {
      throw new Error("User id is required for update");
    }

    const record = await prisma.user.update({
      where: { id: user.id },
      data: {
        fullName: user.fullName,
        email: user.email,
      },
    });

    return toDomain(record);
  }
}

function toDomain(record: { id: string; fullName: string; email: string; createdAt: Date; updatedAt: Date }): User {
  return User.create({
    id: record.id,
    fullName: record.fullName,
    email: record.email,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  });
}
