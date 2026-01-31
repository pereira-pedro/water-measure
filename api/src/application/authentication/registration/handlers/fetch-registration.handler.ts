import { Injectable } from "@nestjs/common";
import { CacheKey } from "../../../../domain/cache/models/cache-key";
import { CacheService } from "../../../cache/cache.service";
import { RegistrationData } from "../../../../domain/authentication/valueobject/registration-data";
import { RegistrationTokenNotFoundException } from "../../../../domain/authentication/exceptions/registration-token-not-found.exception";
import { FetchRegistrationCommand } from "../commands/fetch-registration.command";

@Injectable()
export class FetchRegistrationHandler {
  constructor(private readonly cacheService: CacheService) {}

  async execute(cmd: FetchRegistrationCommand): Promise<RegistrationData> {
    const key = CacheKey.fromParts("registration", cmd.token);
    return this.cacheService.get<RegistrationData>(key).then((data) => {
      if (!data) {
        throw new RegistrationTokenNotFoundException(cmd.token);
      }
      return new RegistrationData(data);
    });
  }
}
