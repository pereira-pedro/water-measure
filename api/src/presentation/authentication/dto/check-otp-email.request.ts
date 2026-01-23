import { IsEmail, IsNotEmpty } from "class-validator";

export class CheckOtpEmailRequest {
  @IsNotEmpty({ message: "email is required" })
  @IsEmail({}, { message: "email must be a valid email address" })
  email!: string;

  @IsNotEmpty({ message: "otp is required" })
  otp!: string;
}
