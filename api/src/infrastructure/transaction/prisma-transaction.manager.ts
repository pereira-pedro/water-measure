import { Injectable } from "@nestjs/common";
import { Prisma, prisma } from "@acme/db";
import { TransactionManager } from "../../domain/transaction/ports/transaction-manager";

@Injectable()
export class PrismaTransactionManager implements TransactionManager {
  run<T>(fn: (tx: Prisma.TransactionClient) => Promise<T>): Promise<T> {
    return prisma.$transaction((tx) => fn(tx));
  }
}
