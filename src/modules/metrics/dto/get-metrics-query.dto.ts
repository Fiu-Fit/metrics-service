import { Type } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetMetricsQueryDTO {
  @IsDateString()
  @IsOptional()
  start?: string;

  @IsDateString()
  @IsOptional()
  end?: string;

  @IsString()
  @IsOptional()
  exercise?: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  user?: number;
}
