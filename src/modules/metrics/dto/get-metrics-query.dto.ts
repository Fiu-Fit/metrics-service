import { IsDateString, IsOptional, IsString } from 'class-validator';

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
}
