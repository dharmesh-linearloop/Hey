import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateEmailAccountWatchDto {
  @IsOptional()
  @ApiPropertyOptional()
  reason?: string;
}
