import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { CorePaginateDto } from 'src/shared/libs/base-query-core.dto';
import { StripeSubscriptionHistory } from './stripe-subscription-history-core.entity';

export class StripeSubscriptionHistoryCorePaginateDto extends CorePaginateDto {
  @ApiProperty({ required: true })
  @IsArray()
  list?: StripeSubscriptionHistory[];
}
