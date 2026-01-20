import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { SendOtpEmailCommand } from "../../application/authentication/commands/otp/send-email-command";
import { SendOtpEmailHandler } from "../../application/authentication/handlers/otp/send-email-handler";
import { CheckOtpEmailRequestDto } from "./dto/check-otp-email.request.dto";
import { CheckOtpEmailCommand } from "src/application/authentication/commands/otp/check-email-command";
import { CheckOtpEmailHandler } from "src/application/authentication/handlers/otp/check-email-handler";
import { SendOtpEmailRequestDto } from "./dto/send-otp-email.request.dto";

@Controller("auth")
export class AuthenticationController {
  constructor(
    private readonly sendOtpEmailHandler: SendOtpEmailHandler,
    private readonly checkOtpEmailHandler: CheckOtpEmailHandler
  ) {}

  @Post("send-otp-email")
  async sendEmailOtp(@Body() dto: SendOtpEmailRequestDto) {
    const command: SendOtpEmailCommand = {
      email: dto.email,
    };

    const result = await this.sendOtpEmailHandler.execute(command);
    return result;
  }

  @Post("check-otp-email")
  async checkEmailOtp(@Body() dto: CheckOtpEmailRequestDto) {
    const command: CheckOtpEmailCommand = {
      email: dto.email,
      otp: dto.otp,
    };

    const isOtpValid = await this.checkOtpEmailHandler.execute(command);

    if (!isOtpValid) {
      throw new BadRequestException("Invalid OTP");
    }

    return { message: "OTP is valid" };
  }
}
