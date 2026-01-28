import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAddressRequest {
  @IsNotEmpty({ message: "street is required" })
  @IsString({ message: "street must be a string" })
  street!: string;

  @IsNotEmpty({ message: "street number is required" })
  @IsString({ message: "street number must be a string" })
  streetNumber!: string;

  @IsOptional()
  @IsString({ message: "neighborhood must be a string" })
  neighborhood?: string | null;

  @IsNotEmpty({ message: "city is required" })
  @IsString({ message: "city must be a string" })
  city!: string;

  @IsNotEmpty({ message: "province is required" })
  @IsString({ message: "province must be a string" })
  province!: string;

  @IsNotEmpty({ message: "postal code is required" })
  @IsString({ message: "postal code must be a string" })
  postalCode!: string;

  @IsNotEmpty({ message: "country is required" })
  @IsString({ message: "country must be a string" })
  country!: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: "latitude must be a number" })
  latitude?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: "longitude must be a number" })
  longitude?: number | null;
}
