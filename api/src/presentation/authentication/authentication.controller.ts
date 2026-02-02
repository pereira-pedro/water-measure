import { BadRequestException, Body, Controller, Post, Put, Param } from "@nestjs/common";
import { Public } from "../common/decorators/public.decorator";
import { SendOtpEmailCommand } from "../../application/authentication/otp/commands/send-email-command";
import { SendOtpEmailHandler } from "../../application/authentication/otp/handlers/send-email-handler";
import { CheckOtpEmailRequest } from "./requests/check-otp-email.request";
import { CheckOtpEmailCommand } from "../../application/authentication/otp/commands/check-email-command";
import { CheckOtpEmailHandler } from "../../application/authentication/otp/handlers/check-email-handler";
import { SendOtpEmailRequest } from "./requests/send-otp-email.request";
import { CreateRegistrationRequest } from "./requests/create-registration-request";
import { UpdateRegistrationRequest } from "./requests/update-registration-request";
import { StartRegistrationCommand } from "../../application/authentication/registration/commands/start-registration.command";
import { StartRegistrationHandler } from "../../application/authentication/registration/handlers/start-registration.handler";
import { UpdateRegistrationHandler } from "../../application/authentication/registration/handlers/update-registration.handler";
import { CommitRegistrationHandler } from "../../application/authentication/registration/handlers/commit-registration.handler";
import { RegistrationData } from "../../domain/authentication/valueobject/registration-data";
import { CommitRegistrationCommand } from "../../application/authentication/registration/commands/commit-registration.command";
import { UpdateRegistrationCommand } from "../../application/authentication/registration/commands/update-registration.command";

@Public()
@Controller("auth")
export class AuthenticationController {
  constructor(
    private readonly sendOtpEmailHandler: SendOtpEmailHandler,
    private readonly checkOtpEmailHandler: CheckOtpEmailHandler,
    private readonly startRegistrationHandler: StartRegistrationHandler,
    private readonly updateRegistrationHandler: UpdateRegistrationHandler,
    private readonly commitRegistrationHandler: CommitRegistrationHandler,
  ) {}

  @Post("send-otp-email")
  async sendEmailOtp(@Body() dto: SendOtpEmailRequest) {
    const command: SendOtpEmailCommand = {
      email: dto.email,
    };

    return await this.sendOtpEmailHandler.execute(command);
  }

  @Post("check-otp-email")
  async checkEmailOtp(@Body() request: CheckOtpEmailRequest) {
    const command: CheckOtpEmailCommand = {
      email: request.email,
      otp: request.otp,
    };

    const result = await this.checkOtpEmailHandler.execute(command);

    if (!result.isValid) {
      throw new BadRequestException("Invalid OTP");
    }

    return result;
  }

  @Post("registration")
  async startRegistration(@Body() request: CreateRegistrationRequest) {
    const command: StartRegistrationCommand = {
      user: request.user,
      address: request.address,
      agreedToTerms: request.agreedToTerms || false,
    };

    return await this.startRegistrationHandler.execute(command);
  }

  @Put("registration/:token/update")
  async updateRegistration(@Param("token") token: string, @Body() request: UpdateRegistrationRequest) {
    const command: UpdateRegistrationCommand = {
      token,
      data: {
        user: request.user,
        address: request.address,
        agreedToTerms: request.agreedToTerms ?? undefined,
      } as RegistrationData,
      canCommit: request.canCommit,
    };

    return await this.updateRegistrationHandler.execute(command);
  }

  @Put("registration/:token/commit")
  async commitRegistration(@Param("token") token: string) {
    const command: CommitRegistrationCommand = {
      token,
    };

    return await this.commitRegistrationHandler.execute(command);
  }
}
