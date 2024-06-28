import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class DeleteNoteDto {
  @IsOptional()
  @ApiPropertyOptional()
  reason?: string = 'Note Deleted';
}
