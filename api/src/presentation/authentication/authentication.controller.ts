import { BadRequestException, Body, Controller, Post, Put, Param } from "@nestjs/common";
import { SendOtpEmailCommand } from "../../application/authentication/otp/commands/send-email-command";
import { SendOtpEmailHandler } from "../../application/authentication/otp/handlers/send-email-handler";
import { CheckOtpEmailRequest } from "./dto/check-otp-email.request.dto";
import { CheckOtpEmailCommand } from "src/application/authentication/otp/commands/check-email-command";
import { CheckOtpEmailHandler } from "src/application/authentication/otp/handlers/check-email-handler";
import { SendOtpEmailRequest } from "./dto/send-otp-email.request.dto";
import { StartRegistrationRequest } from "./dto/start-registration.dto";
import { StartRegistrationCommand } from "src/application/authentication/registration/commands/start-registration.command";
import { StartRegistrationHandler } from "src/application/authentication/registration/handlers/start-registration.handler";
import { UpdateRegistrationHandler } from "src/application/authentication/registration/handlers/update-registration.handler";

@Controller("auth")
export class AuthenticationController {
  constructor(
    private readonly sendOtpEmailHandler: SendOtpEmailHandler,
    private readonly checkOtpEmailHandler: CheckOtpEmailHandler,
    private readonly startRegistrationHandler: StartRegistrationHandler,
    private readonly updateRegistrationHandler: UpdateRegistrationHandler
  ) {}

  @Post("send-otp-email")
  async sendEmailOtp(@Body() dto: SendOtpEmailRequest) {
    const command: SendOtpEmailCommand = {
      email: dto.email,
    };

    return await this.sendOtpEmailHandler.execute(command);
  }

  @Post("check-otp-email")
  async checkEmailOtp(@Body() dto: CheckOtpEmailRequest) {
    const command: CheckOtpEmailCommand = {
      email: dto.email,
      otp: dto.otp,
    };

    const result = await this.checkOtpEmailHandler.execute(command);

    if (!result.isValid) {
      throw new BadRequestException("Invalid OTP");
    }

    return result;
  }

  @Post("registration")
  async startRegistration(@Body() dto: StartRegistrationRequest) {
    const command: StartRegistrationCommand = {
      email: dto.email,
    };

    return await this.startRegistrationHandler.execute(command);
  }

  @Put("registration/:token")
  async updateRegistration(@Param("token") token: string, @Body() dto: any) {
    const command = {
      token,
      data: dto,
    };

    return await this.updateRegistrationHandler.execute(command);
  }
}
