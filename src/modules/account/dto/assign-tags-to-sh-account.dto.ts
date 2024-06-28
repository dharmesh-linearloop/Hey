import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class AssignTagsToShAccountDto {
  @ApiProperty({
    description: 'Array of numbers',
    type: [Number],
  })
  @ArrayMaxSize(1000)
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  tagIds: number[];
}
