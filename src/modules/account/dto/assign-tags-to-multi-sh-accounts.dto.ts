import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { ListAccountDto } from './list-account.dto';

export class AssignTagsToMultiShAccountsDto {
  @ApiPropertyOptional({
    required: false,
    description: 'Array of numbers',
    type: [Number],
  })
  @ArrayMaxSize(1000)
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  shAccountIds: number[];

  @ApiProperty({
    description: 'Array of numbers',
    type: [Number],
  })
  @ArrayMaxSize(1000)
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  tagIds: number[];

  @IsOptional()
  @ApiPropertyOptional()
  filters?: ListAccountDto;
}
