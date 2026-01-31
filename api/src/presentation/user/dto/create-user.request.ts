import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserRequest {
  @IsNotEmpty({ message: "fullName is required" })
  @IsString({ message: "fullName must be a string" })
  fullName!: string;

  @IsNotEmpty({ message: "email is required" })
  @IsEmail({}, { message: "email must be a valid email address" })
  email!: string;
}
