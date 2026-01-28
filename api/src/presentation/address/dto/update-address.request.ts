import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateAddressRequest {
  @IsOptional()
  @IsString({ message: "street must be a string" })
  street?: string;

  @IsOptional()
  @IsString({ message: "street number must be a string" })
  streetNumber?: string;

  @IsOptional()
  @IsString({ message: "neighborhood must be a string" })
  neighborhood?: string | null;

  @IsOptional()
  @IsString({ message: "city must be a string" })
  city?: string;

  @IsOptional()
  @IsString({ message: "province must be a string" })
  province?: string;

  @IsOptional()
  @IsString({ message: "postal code must be a string" })
  postalCode?: string;

  @IsOptional()
  @IsString({ message: "country must be a string" })
  country?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: "latitude must be a number" })
  latitude?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: "longitude must be a number" })
  longitude?: number | null;
}
