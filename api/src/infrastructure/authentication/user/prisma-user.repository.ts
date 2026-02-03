import { Injectable } from "@nestjs/common";
import { Prisma, prisma } from "@acme/db";
import { UserRepository } from "../../../domain/authentication/ports/user-repository";
import { User } from "../../../domain/authentication/models/user";
import { Address } from "../../../domain/address/models/address";
import { TransactionContext } from "../../../domain/transaction/ports/transaction-manager";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const record = await prisma.user.findUnique({ where: { id } });
    return record ? toDomain(record) : null;
  }

  async findByIdWithAddresses(id: string): Promise<{ user: User; addresses: Address[] } | null> {
    const record = await prisma.user.findUnique({
      where: { id },
      include: { addresses: true },
    });

    if (!record) {
      return null;
    }

    const user = toDomain(record);
    const addresses = record.addresses.map(toAddressDomain);
    return { user, addresses };
  }

  async findByEmail(email: string): Promise<User | null> {
    const normalized = email.trim().toLowerCase();
    const record = await prisma.user.findUnique({ where: { email: normalized } });
    return record ? toDomain(record) : null;
  }

  async findAll(): Promise<User[]> {
    const records = await prisma.user.findMany();
    return records.map(toDomain);
  }

  async create(user: User, tx?: TransactionContext): Promise<User> {
    const db = (tx as Prisma.TransactionClient) ?? prisma;
    const record = await db.user.create({
      data: {
        fullName: user.fullName,
        email: user.email,
      },
    });

    return toDomain(record);
  }

  async delete(id: string, tx?: TransactionContext): Promise<void> {
    const db = (tx as Prisma.TransactionClient) ?? prisma;
    await db.user.delete({ where: { id } });
  }

  async update(user: User, tx?: TransactionContext): Promise<User> {
    if (!user.id) {
      throw new Error("User id is required for update");
    }

    const db = (tx as Prisma.TransactionClient) ?? prisma;
    const record = await db.user.update({
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

function toAddressDomain(record: {
  id: string;
  userId: string;
  street: string;
  street_number: string;
  neighborhood: string | null;
  city: string;
  province: string;
  postal_code: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}): Address {
  return Address.create({
    id: record.id,
    userId: record.userId,
    street: record.street,
    streetNumber: record.street_number,
    neighborhood: record.neighborhood,
    city: record.city,
    province: record.province,
    postalCode: record.postal_code,
    country: record.country,
    location: null,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  });
}
