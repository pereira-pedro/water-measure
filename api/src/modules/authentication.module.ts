import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AuthenticationController } from "../presentation/authentication/authentication.controller";
import { SendOtpEmailHandler } from "../application/authentication/otp/handlers/send-email-handler";
import { EmailNotificationModule } from "./email-notification.module";
import { CacheModule } from "./cache.module";
import { CheckOtpEmailHandler } from "src/application/authentication/otp/handlers/check-email-handler";
import { StartRegistrationHandler } from "src/application/authentication/registration/handlers/start-registration.handler";
import { UpdateRegistrationHandler } from "src/application/authentication/registration/handlers/update-registration.handler";
import { CommitRegistrationHandler } from "src/application/authentication/registration/handlers/commit-registration.handler";
import { CreateUserHandler } from "src/application/authentication/user/handlers/create-user.handler";
import { USER_REPOSITORY } from "../domain/authentication/ports/user-repository";
import { PrismaUserRepository } from "../infrastructure/authentication/user/prisma-user.repository";
import { CreateTokenHandler } from "src/application/authentication/token/handlers/create-token.handler";
import { VerifyTokenHandler } from "src/application/authentication/token/handlers/verify-token.handler";
import { TOKEN_REPOSITORY } from "src/domain/authentication/token/token-repository";
import { PrismaTokenRepository } from "src/infrastructure/authentication/token/prisma-token.repository";
import { JwtAuthGuard } from "../presentation/common/guards/jwt-auth.guard";

@Module({
  imports: [CacheModule, EmailNotificationModule],
  controllers: [AuthenticationController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    SendOtpEmailHandler,
    CheckOtpEmailHandler,
    StartRegistrationHandler,
    UpdateRegistrationHandler,
    CommitRegistrationHandler,
    CreateUserHandler,
    CreateTokenHandler,
    VerifyTokenHandler,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
    {
      provide: TOKEN_REPOSITORY,
      useClass: PrismaTokenRepository,
    },
  ],
})
export class AuthenticationModule {}
