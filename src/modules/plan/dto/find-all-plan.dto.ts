import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindAllPlanDto {
  @ApiProperty({ required: false, example: '' })
  @IsString()
  @IsOptional()
  excludeCustomPlans?: string = '';
}
