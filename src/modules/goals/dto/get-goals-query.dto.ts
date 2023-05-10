import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetGoalsQueryDto {
    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    user?: number;
}

