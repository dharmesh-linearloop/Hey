import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { CorePaginateDto } from 'src/shared/libs/base-query-core.dto';
import { AgencyEmailVerificationCreditUsage } from './agency-email-verification-credit-usage-core.entity';

export class AgencyEmailVerificationCreditUsageCorePaginateDto extends CorePaginateDto {
  @ApiProperty({ required: true })
  @IsArray()
  list?: AgencyEmailVerificationCreditUsage[];
}
