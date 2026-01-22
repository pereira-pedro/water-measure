import { Module } from "@nestjs/common";
import { AuthenticationController } from "../presentation/authentication/authentication.controller";
import { SendOtpEmailHandler } from "../application/authentication/otp/handlers/send-email-handler";
import { EmailNotificationModule } from "./email-notification.module";
import { CacheModule } from "./cache.module";
import { CheckOtpEmailHandler } from "src/application/authentication/otp/handlers/check-email-handler";
import { StartRegistrationHandler } from "src/application/authentication/registration/handlers/start-registration.handler";
import { UpdateRegistrationHandler } from "src/application/authentication/registration/handlers/update-registration.handler";
import { USER_REPOSITORY } from "../domain/authentication/ports/user-repository";
import { PrismaUserRepository } from "../infrastructure/authentication/user/prisma-user.repository";

@Module({
  imports: [CacheModule, EmailNotificationModule],
  controllers: [AuthenticationController],
  providers: [
    SendOtpEmailHandler,
    CheckOtpEmailHandler,
    StartRegistrationHandler,
    UpdateRegistrationHandler,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
  ],
})
export class AuthenticationModule {}
