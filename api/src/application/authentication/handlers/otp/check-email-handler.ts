import { Inject, Injectable } from "@nestjs/common";
import { CheckOtpEmailCommand } from "../../commands/otp/check-email-command";
import { CacheKey } from "../../../../domain/cache/models/cache-key";
import { CACHE_GATEWAY, CacheGateway } from "src/domain/cache/ports/cache-gateway";

@Injectable()
export class CheckOtpEmailHandler {
  constructor(@Inject(CACHE_GATEWAY) private readonly cacheGateway: CacheGateway) {}

  async execute(cmd: CheckOtpEmailCommand): Promise<boolean> {
    return this.checkOtp(cmd.email, cmd.otp);
  }

  private async checkOtp(email: string, otp: string): Promise<boolean> {
    const key = CacheKey.fromParts("authentication-otp", email);
    const cachedOtp = await this.cacheGateway.get(key);
    return cachedOtp === otp;
  }
}
