import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { SubscriptionType } from 'src/shared/types/subscription';

export class SyncStripeDto {
  @IsNotEmpty()
  @ApiProperty()
  stripeSubscriptionId: string;

  @IsNotEmpty()
  @IsEnum(SubscriptionType)
  applicationType: SubscriptionType;
}
