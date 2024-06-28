import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  @ApiProperty()
  shAccountId: number;

  @IsNotEmpty()
  @ApiProperty()
  note: string;
}
