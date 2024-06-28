import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ExportFiltersDto {
  @IsOptional()
  @ApiPropertyOptional()
  filters?: any;
}
