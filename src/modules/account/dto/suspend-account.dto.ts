import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class SuspendAccountDto {
  @IsNotEmpty()
  @ApiProperty()
  @MinLength(30)
  @MaxLength(1000)
  reason: string;
}