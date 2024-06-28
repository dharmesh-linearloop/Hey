import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max } from 'class-validator';
import { MAX_FIND_ALL_LIMIT } from 'src/keys';

export class BaseFilterCoreDto {
  @ApiProperty({ required: false, example: 0 })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  skip?: number;

  @ApiProperty({ required: false, example: 20 })
  @Type(() => Number)
  @IsInt()
  @Max(MAX_FIND_ALL_LIMIT)
  @IsOptional()
  take?: number;

  @ApiProperty({ required: false, example: { createdAt: 'asc' } })
  @IsOptional()
  order?: any;

  @ApiProperty({ required: false, example: { user: true } })
  @IsOptional()
  relations?: any;

  @ApiProperty({ required: false, example: { status: 'IsActive' } })
  @IsOptional()
  where?: any;

  search_column?: any;
  search_full_name?: any;
  withDeleted?: any;

  @ApiProperty({ required: false, example: '' })
  @IsString()
  @IsOptional()
  search?: string = '';
}
