import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { CorePaginateDto } from 'src/shared/libs/base-query-core.dto';
import { EmailAccountCustomDomain } from './email-account-custom-domain-core.entity';

export class EmailAccountCustomDomainCorePaginateDto extends CorePaginateDto {
  @ApiProperty({ required: true })
  @IsArray()
  list?: EmailAccountCustomDomain[];
}
