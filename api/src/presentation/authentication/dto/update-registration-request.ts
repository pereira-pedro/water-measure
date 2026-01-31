import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { UpdateAddressRequest } from "src/presentation/address/dto/update-address.request";
import { UpdateUserRequest } from "src/presentation/user/dto/update-user.request";

export class UpdateRegistrationRequest {
  @IsNotEmpty({ message: "user is required" })
  @ValidateNested()
  @Type(() => UpdateUserRequest)
  user?: UpdateUserRequest;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateAddressRequest)
  address?: UpdateAddressRequest;

  @IsOptional()
  @IsBoolean()
  agreedToTerms?: boolean;

  @IsBoolean()
  canCommit: boolean = false;
}
