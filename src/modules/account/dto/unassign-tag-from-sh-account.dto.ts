import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UnassignTagFromShAccountDto {
  @IsNotEmpty()
  @ApiProperty()
  tagId: number;
}
