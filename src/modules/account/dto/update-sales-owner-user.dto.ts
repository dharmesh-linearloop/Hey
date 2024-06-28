import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateSalesOwnerUserDto {
  @IsNotEmpty()
  @ApiProperty()
  userId: number;
}
