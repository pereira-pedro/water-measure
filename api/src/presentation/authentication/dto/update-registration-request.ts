import { IsOptional } from "class-validator";

export class UpdateRegistrationRequest {
  @IsOptional()
  fullName?: string;
}
