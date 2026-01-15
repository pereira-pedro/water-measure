import { Get, Module } from "@nestjs/common";
import { JobsModule } from "../jobs/jobs.module";
import { EnqueueDemoCommand } from "../application/status/commands/enqueue-demo.command";
import { GetDatabaseNowQuery } from "../application/status/queries/get-database-now.query";
import { GetHealthQuery } from "../application/status/queries/get-health.query";
import { PrismaStatusRepository } from "../infrastructure/status/prisma-status.repository";
import { BullmqDemoQueue } from "../infrastructure/status/bullmq-demo.queue";
import { StatusController } from "../presentation/status/status.controller";
import { DEMO_QUEUE, STATUS_REPOSITORY } from "../application/status/status.tokens";
import { GetDatabaseTablesQuery } from "src/application/status/queries/get-database-tables.query";

@Module({
  imports: [JobsModule],
  controllers: [StatusController],
  providers: [
    GetHealthQuery,
    GetDatabaseNowQuery,
    GetDatabaseTablesQuery,
    EnqueueDemoCommand,
    { provide: STATUS_REPOSITORY, useClass: PrismaStatusRepository },
    { provide: DEMO_QUEUE, useClass: BullmqDemoQueue },
  ],
})
export class StatusModule {}
