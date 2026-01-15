import { Injectable } from "@nestjs/common";
import type { StatusRepository } from "../../domain/status/status.repository";
import { prisma } from "@acme/db";

@Injectable()
export class PrismaStatusRepository implements StatusRepository {
  async getDatabaseNow() {
    const rows = await prisma.$queryRaw<Array<{ now: Date }>>`SELECT NOW() as now`;
    return rows?.[0]?.now ?? null;
  }

  async showTables() {
    const rows = await prisma.$queryRaw<Array<{ table_name: string }>>`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `;

    return rows.map((r) => r.table_name);
  }
}