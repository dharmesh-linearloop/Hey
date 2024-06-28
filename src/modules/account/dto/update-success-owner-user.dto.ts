import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateSuccessOwnerUserDto {
  @IsNotEmpty()
  @ApiProperty()
  userId: number;
}
