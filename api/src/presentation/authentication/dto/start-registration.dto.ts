import { IsEmail, IsNotEmpty } from "class-validator";

export class StartRegistrationRequest {
  @IsNotEmpty({ message: "email is required" })
  @IsEmail({}, { message: "email must be a valid email address" })
  email!: string;
}
