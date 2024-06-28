import { ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsNumber, IsOptional } from 'class-validator';
import { ListAccountDto } from './list-account.dto';

export class AssignSalesOwnerMultiAccountsDto {
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

  @IsOptional()
  @ApiPropertyOptional()
  filters?: ListAccountDto;
}
