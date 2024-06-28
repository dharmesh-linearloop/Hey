import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional()
  firstName: string;

  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional()
  lastName: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.toString().toLowerCase())
  @ApiPropertyOptional()
  email: string;

  @IsOptional()
  @ApiPropertyOptional()
  @MinLength(30)
  @MaxLength(1000)
  note?: string;
}
