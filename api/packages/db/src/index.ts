import { PrismaClient } from "@prisma/client";
import type { PrismaClient as PrismaClientType } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClientType | undefined;
}

const globalPrisma = globalThis as typeof globalThis & {
  __prisma?: PrismaClientType;
  __prismaPool?: Pool;
};

const pool =
  globalPrisma.__prismaPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") {
  globalPrisma.__prismaPool = pool;
}

export const prisma =
  globalPrisma.__prisma ??
  new PrismaClient({
    adapter: new PrismaPg(pool),
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalPrisma.__prisma = prisma;
}

export * from "@prisma/client";
