import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { CorePaginateDto } from 'src/shared/libs/base-query-core.dto';
import { EmailVerificationCreditUsage } from './email-verification-credit-usage-core.entity';

export class EmailVerificationCreditUsageCorePaginateDto extends CorePaginateDto {
  @ApiProperty({ required: true })
  @IsArray()
  list?: EmailVerificationCreditUsage[];
}
