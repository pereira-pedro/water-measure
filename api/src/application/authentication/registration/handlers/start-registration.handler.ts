import { Inject, Injectable } from "@nestjs/common";
import { CacheKey } from "../../../../domain/cache/models/cache-key";
import { CACHE_GATEWAY, CacheGateway } from "src/domain/cache/ports/cache-gateway";
import { StartRegistrationCommand } from "../commands/start-registration.command";
import { StartRegistrationResult } from "src/domain/authentication/dto/start-registration-result";
import { RegistrationData } from "../../../../domain/authentication/valueobject/registration-data";
@Injectable()
export class StartRegistrationHandler {
  constructor(@Inject(CACHE_GATEWAY) private readonly cacheGateway: CacheGateway) {}

  async execute(cmd: StartRegistrationCommand): Promise<StartRegistrationResult> {
    const registrationData = this.createRegistrationData(cmd);

    const token = this.generateToken();
    await this.cacheGateway.set(CacheKey.fromParts("registration", token), registrationData, { ttlSeconds: 3600 });

    return { token, registrationData } as StartRegistrationResult;
  }

  private generateToken(): string {
    return crypto.randomUUID();
  }

  private createRegistrationData(cmd: StartRegistrationCommand): RegistrationData {
    if (cmd.address) {
      cmd.address.userId = "";
    }

    return new RegistrationData({
      user: cmd.user,
      address: cmd.address,
      agreedToTerms: false,
    });
  }
}
