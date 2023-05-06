import { IsDateString, IsOptional } from 'class-validator';

export class DateFilterDTO {
  @IsDateString()
  @IsOptional()
  start?: string;

  @IsDateString()
  @IsOptional()
  end?: string;
}
