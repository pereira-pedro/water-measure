import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { Public } from "../common/decorators/public.decorator";
import { EnqueueDemoCommand } from "../../application/status/commands/enqueue-demo.command";
import { GetDatabaseNowQuery } from "../../application/status/queries/get-database-now.query";
import { GetDatabaseTablesQuery } from "../../application/status/queries/get-database-tables.query";
import { GetHealthQuery } from "../../application/status/queries/get-health.query";
import { EnqueueDemoBodyDto, EnqueueDemoQueryDto } from "./dto/enqueue-demo.dto";

@Controller()
export class StatusController {
  constructor(
    private readonly getHealthQuery: GetHealthQuery,
    private readonly getDatabaseNowQuery: GetDatabaseNowQuery,
    private readonly getDatabaseTablesQuery: GetDatabaseTablesQuery,
    private readonly enqueueDemoCommand: EnqueueDemoCommand,
  ) {}

  @Get("health")
  @Public()
  health() {
    return this.getHealthQuery.execute();
  }

  @Get("db-now")
  async dbNow() {
    const now = await this.getDatabaseNowQuery.execute();
    return { now };
  }

  @Get("db-tables")
  async dbTables() {
    const tables = await this.getDatabaseTablesQuery.execute();
    return { tables };
  }

  @Post("jobs/demo")
  async enqueueDemoPost(@Body() body: EnqueueDemoBodyDto) {
    return this.enqueueDemoCommand.execute(body?.name);
  }

  @Get("jobs/demo")
  async enqueueDemoGet(@Query() query: EnqueueDemoQueryDto) {
    return this.enqueueDemoCommand.execute(query?.name);
  }
}
