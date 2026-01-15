import { IsOptional, IsString } from "class-validator";

export class EnqueueDemoBodyDto {
  @IsOptional()
  @IsString()
  name?: string;
}

export class EnqueueDemoQueryDto {
  @IsOptional()
  @IsString()
  name?: string;
}
