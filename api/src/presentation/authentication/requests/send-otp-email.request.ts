import { IsEmail, IsNotEmpty } from "class-validator";

export class SendOtpEmailRequest {
  @IsNotEmpty({ message: "email is required" })
  @IsEmail({}, { message: "email must be a valid email address" })
  email!: string;
}
