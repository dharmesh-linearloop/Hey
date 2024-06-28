import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class DeleteUserDto {
  @IsOptional()
  @ApiPropertyOptional()
  reason?: string = 'User Deleted';
}
