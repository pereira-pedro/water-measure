import { IsOptional, IsString } from "class-validator";

export class UpdateUserRequest {
  @IsOptional()
  @IsString({ message: "fullName must be a string" })
  fullName?: string;
}
