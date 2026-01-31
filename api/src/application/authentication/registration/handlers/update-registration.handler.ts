import { Injectable } from "@nestjs/common";
import { CacheKey } from "../../../../domain/cache/models/cache-key";
import { CacheService } from "../../../cache/cache.service";
import { RegistrationData } from "../../../../domain/authentication/valueobject/registration-data";
import { UpdateRegistrationCommand } from "../commands/update-registration.command";
import { FetchRegistrationHandler } from "./fetch-registration.handler";

@Injectable()
export class UpdateRegistrationHandler {
  constructor(
    private readonly cacheService: CacheService,
    private readonly fetchRegistrationHandler: FetchRegistrationHandler,
  ) {}

  async execute(cmd: UpdateRegistrationCommand): Promise<RegistrationData> {
    const registrationData: RegistrationData = await this.fetchRegistrationHandler.execute({ token: cmd.token });

    registrationData.merge(cmd.data);

    await this.saveUpdatedData(cmd.token, registrationData);

    return registrationData;
  }

  private async saveUpdatedData(token: string, registrationData: RegistrationData): Promise<void> {
    const key = CacheKey.fromParts("registration", token);
    await this.cacheService.set(key, registrationData, { ttlSeconds: 3600 });
  }
}
