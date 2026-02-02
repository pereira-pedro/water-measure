import { Type } from "class-transformer";
import { IsBoolean, IsDefined, IsNotEmpty, IsOptional, ValidateIf, ValidateNested } from "class-validator";
import { UpdateAddressRequest } from "src/presentation/address/requests/update-address.request";
import { UpdateUserRequest } from "src/presentation/user/requests/update-user.request";

export class UpdateRegistrationRequest {
  @ValidateIf((o) => !o.agreedToTerms && !o.address)
  @IsDefined({ message: "user is required" })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateUserRequest)
  user?: UpdateUserRequest;

  @ValidateIf((o) => !o.agreedToTerms && !o.user)
  @IsDefined({ message: "address is required" })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateAddressRequest)
  address?: UpdateAddressRequest;

  @ValidateIf((o) => !o.user && !o.address)
  @IsDefined({ message: "agreedToTerms is required" })
  @IsBoolean()
  agreedToTerms?: boolean;

  @IsBoolean()
  canCommit: boolean = false;
}
