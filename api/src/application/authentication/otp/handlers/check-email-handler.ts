import { Inject, Injectable } from "@nestjs/common";
import { CheckOtpEmailCommand } from "../../otp/commands/check-email-command";
import { CacheKey } from "../../../../domain/cache/models/cache-key";
import { CACHE_GATEWAY, CacheGateway } from "src/domain/cache/ports/cache-gateway";
import { USER_REPOSITORY, UserRepository } from "src/domain/authentication/ports/user-repository";
import { User } from "../../../../domain/authentication/models/user";
import { CheckOtpResult } from "src/domain/authentication/dto/check-otp-result";
import { StartRegistrationHandler } from "../../registration/handlers/start-registration.handler";
import { StartRegistrationCommand } from "../../registration/commands/start-registration.command";
import { CreateTokenHandler } from "../../token/handlers/create-token.handler";
import { CreateTokenCommand } from "../../token/commands/create-token.command";

@Injectable()
export class CheckOtpEmailHandler {
  constructor(
    @Inject(CACHE_GATEWAY) private readonly cacheGateway: CacheGateway,
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    private readonly createTokenHandler: CreateTokenHandler,
  ) {}
  async execute(cmd: CheckOtpEmailCommand): Promise<CheckOtpResult> {
    const isValid = await this.checkOtp(cmd.email, cmd.otp);
    if (!isValid) {
      return { isValid: false } as CheckOtpResult;
    }

    const user = await this.findUserByEmail(cmd.email);
    if (user) {
      const awt = await this.createTokenHandler.execute({
        userId: user.id,
        scope: "user",
        ttlMinutes: 525600 * 5, // 5 years
      } as CreateTokenCommand);
      return { isValid: true, user, token: awt.token } as CheckOtpResult;
    }

    return { isValid: true } as CheckOtpResult;
  }

  private async checkOtp(email: string, otp: string): Promise<boolean> {
    const key = CacheKey.fromParts("authentication-otp", email);
    const cachedOtp = await this.cacheGateway.get(key);
    return cachedOtp === otp;
  }

  private async findUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }
}
