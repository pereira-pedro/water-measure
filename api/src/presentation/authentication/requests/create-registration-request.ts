import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { CreateAddressRequest } from "src/presentation/address/requests/create-address.request";
import { CreateUserRequest } from "src/presentation/user/requests/create-user.request";

export class CreateRegistrationRequest {
  @IsNotEmpty({ message: "user is required" })
  @ValidateNested()
  @Type(() => CreateUserRequest)
  user?: CreateUserRequest;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAddressRequest)
  address?: CreateAddressRequest;

  @IsNotEmpty({ message: "agreedToTerms is required" })
  @IsBoolean()
  agreedToTerms?: boolean;
}
