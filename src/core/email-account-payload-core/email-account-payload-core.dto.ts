import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { CorePaginateDto } from 'src/shared/libs/base-query-core.dto';
import { EmailAccountsPayload } from './email-account-payload-core.entity';

export class EmailAccountsPayloadCorePaginateDto extends CorePaginateDto {
  @ApiProperty({ required: true })
  @IsArray()
  list?: EmailAccountsPayload[];
}
