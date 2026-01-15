import { Inject, Injectable } from "@nestjs/common";
import type { StatusRepository } from "../../../domain/status/status.repository";
import { STATUS_REPOSITORY } from "../status.tokens";

@Injectable()
export class GetDatabaseNowQuery {
  constructor(@Inject(STATUS_REPOSITORY) private readonly statusRepository: StatusRepository) {}

  async execute() {
    return this.statusRepository.getDatabaseNow();
  }
}
