import { Injectable } from "@nestjs/common";
import { CacheKey } from "../../../../domain/cache/models/cache-key";
import { CacheService } from "../../../cache/cache.service";
import { User } from "../../../../domain/authentication/models/user";
import { RegistrationTokenNotFoundException } from "../../../../domain/authentication/exceptions/registration-token-not-found.exception";
import { UpdateRegistrationCommand } from "../commands/update-registration.command";

@Injectable()
export class UpdateRegistrationHandler {
  constructor(private readonly cacheService: CacheService) {}

  async execute(cmd: UpdateRegistrationCommand): Promise<User> {
    const user = await this.fetchRegistrationData(cmd.token);
    const updatedData = this.pick<User, keyof User>(cmd.data, User.fillable());

    Object.assign(user, updatedData);
    await this.saveUpdatedData(cmd.token, user);

    return user;
  }

  private fetchRegistrationData(token: string): Promise<User> {
    const key = CacheKey.fromParts("registration", token);
    return this.cacheService.get<User>(key).then((data) => {
      if (!data) {
        throw new RegistrationTokenNotFoundException(token);
      }
      return data;
    });
  }

  private async saveUpdatedData(token: string, user: User): Promise<void> {
    const key = CacheKey.fromParts("registration", token);
    await this.cacheService.set(key, user, { ttlSeconds: 3600 });
  }

  private pick<T extends object, K extends keyof T>(src: Partial<T>, keys: K[]): Pick<T, K> {
    const out = {} as Pick<T, K>;
    for (const k of keys) {
      if (src[k] === undefined) {
        continue;
      }

      out[k] = src[k] as T[K];
    }
    return out;
  }
}
