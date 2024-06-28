import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  ValidateIf,
} from 'class-validator';
import { MAX_FIND_ALL_LIMIT } from 'src/keys';

export class BaseQueryCoreDto {
  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  skip?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsInt()
  @Max(MAX_FIND_ALL_LIMIT)
  @IsOptional()
  take?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  orderBy?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  include?: string[];

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @ValidateIf((o) => o.search)
  search_column?: string[];

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  search?: string;
}

export class CoreIncludesDto {
  @ApiProperty({ required: false })
  @IsOptional()
  include?: string[];
}

export class CorePaginateDto {
  @ApiProperty({ required: true })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  count: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  total: number;

  @ApiProperty({ required: false })
  @IsBoolean()
  hasMany: boolean;
}
