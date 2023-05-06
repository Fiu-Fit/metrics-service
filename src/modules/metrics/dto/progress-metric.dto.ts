import { Unit } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export class ProgressMetricDTO {
  @IsNumber()
  calories_burnt: number;

  @IsNumber()
  value: number;

  @IsEnum(Unit)
  unit: Unit;

  @IsNumber()
  exerciseId: string;

  @IsNumber()
  userId: number;

  @IsOptional()
  updatedAt?: Date;
}
