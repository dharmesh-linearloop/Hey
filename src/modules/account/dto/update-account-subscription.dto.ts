import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  SubscriptionPaymentMethodDto,
  SubscriptionRenewalType,
} from 'src/core/account-subscription-core/account-subscription-core.enum';
import { DATE_SETTINGS } from 'src/keys';
import { ValidateDateTime } from 'src/shared/decorators/custom-validations.decorator';
import { SubscriptionType } from 'src/shared/types/subscription';

export class UpdateAccountSubscriptionDto {
  @IsOptional()
  @Type(() => Number)
  @ApiPropertyOptional({ type: Number })
  planId: number;

  @IsOptional()
  @Type(() => Number)
  @ApiPropertyOptional({ type: Number })
  slotSize: number;

  @ApiProperty({
    required: true,
    enum: SubscriptionPaymentMethodDto,
  })
  @IsNotEmpty()
  @IsEnum(SubscriptionPaymentMethodDto)
  paymentMethod: SubscriptionPaymentMethodDto;

  @ApiProperty({
    required: true,
    enum: SubscriptionRenewalType,
  })
  @IsNotEmpty()
  @IsEnum(SubscriptionRenewalType)
  renewalType: SubscriptionRenewalType;

  @IsNotEmpty()
  @IsEnum(SubscriptionType)
  applicationType: SubscriptionType;

  @IsOptional()
  @ApiPropertyOptional()
  customerId: string;

  @IsOptional()
  @ApiPropertyOptional()
  subscriptionId: string;

  @IsOptional()
  @ApiPropertyOptional({ example: '2020-12-30 00:00:00' })
  @ValidateDateTime(
    { format: DATE_SETTINGS.DATE_TIME_FORMAT },
    { message: DATE_SETTINGS.INVALID_DATE_TIME },
  )
  startAt: string;

  @IsOptional()
  @ApiPropertyOptional({ example: '2020-12-31 23:59:59' })
  @ValidateDateTime(
    { format: DATE_SETTINGS.DATE_TIME_FORMAT },
    { message: DATE_SETTINGS.INVALID_DATE_TIME },
  )
  endAt: string;

  @IsOptional()
  @ApiPropertyOptional()
  @MinLength(30)
  @MaxLength(1000)
  note: string;
}
