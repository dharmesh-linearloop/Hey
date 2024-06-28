import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class DeleteAccountDto {
  @IsOptional()
  @ApiPropertyOptional()
  reason?: string = 'Account Deleted';
}
