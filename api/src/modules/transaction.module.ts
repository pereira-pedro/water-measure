import { Module } from "@nestjs/common";
import { TRANSACTION_MANAGER } from "../domain/transaction/ports/transaction-manager";
import { PrismaTransactionManager } from "../infrastructure/transaction/prisma-transaction.manager";

@Module({
  providers: [
    {
      provide: TRANSACTION_MANAGER,
      useClass: PrismaTransactionManager,
    },
  ],
  exports: [TRANSACTION_MANAGER],
})
export class TransactionModule {}
