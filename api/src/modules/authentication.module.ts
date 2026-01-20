import { Module } from "@nestjs/common";
import { AuthenticationController } from "../presentation/authentication/authentication.controller";
import { SendOtpEmailHandler } from "../application/authentication/handlers/otp/send-email-handler";
import { EmailModule } from "./notification/email.module";
import { CacheModule } from "./cache.module";
import { CheckOtpEmailHandler } from "src/application/authentication/handlers/otp/check-email-handler";

@Module({
  imports: [CacheModule, EmailModule],
  controllers: [AuthenticationController],
  providers: [SendOtpEmailHandler, CheckOtpEmailHandler],
})
export class AuthenticationModule {}
