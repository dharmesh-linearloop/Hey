import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class DeleteAdminPanelTagDto {
  @IsOptional()
  @ApiPropertyOptional()
  reason?: string = 'Tag Deleted';
}
