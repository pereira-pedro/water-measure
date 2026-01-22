import { Inject, Injectable } from "@nestjs/common";
import { CacheKey } from "../../../../domain/cache/models/cache-key";
import { CACHE_GATEWAY, CacheGateway } from "src/domain/cache/ports/cache-gateway";
import { User } from "../../../../domain/authentication/models/user";
import { StartRegistrationCommand } from "../commands/start-registration.command";
import { StartRegistrationResult } from "src/domain/authentication/dto/start-registration-result";

@Injectable()
export class StartRegistrationHandler {
  constructor(@Inject(CACHE_GATEWAY) private readonly cacheGateway: CacheGateway) {}

  async execute(cmd: StartRegistrationCommand): Promise<StartRegistrationResult> {
    const user = User.create({
      email: cmd.email,
      fullName: '',
    });

    const token = this.generateToken();
    await this.cacheGateway.set(CacheKey.fromParts("registration", token), user, { ttlSeconds: 3600 });

    return { token, user };
  }

  private generateToken(): string {
    return crypto.randomUUID();
  }
}
