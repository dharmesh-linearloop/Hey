import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UpdateEmailVerificationCreditUsageDto {
  @IsNotEmpty()
  @ApiProperty()
  creditsAvailable: number;

  @IsNotEmpty()
  @ApiProperty()
  @MinLength(30)
  @MaxLength(1000)
  note: string;
}
