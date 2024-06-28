import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';
import { StripePlanCreationPreference } from 'src/core/account-subscription-core/account-subscription-core.enum';

export class CreatePlanDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  parentPlanId: number;

  @IsNotEmpty()
  @ApiProperty()
  planName: string;

  @ApiPropertyOptional({
    required: false,
    enum: StripePlanCreationPreference,
  })
  @IsOptional()
  @IsEnum(StripePlanCreationPreference)
  stripePlanCreationPreference: StripePlanCreationPreference;

  @IsOptional()
  @ApiPropertyOptional()
  stripePlanId: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  @Min(0)
  billingCycle: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  @Min(0)
  amount: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  @Min(0)
  prospectLimit: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  @Min(0)
  emailLimit: number;
}
