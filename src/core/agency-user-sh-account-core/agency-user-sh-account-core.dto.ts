import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { CorePaginateDto } from 'src/shared/libs/base-query-core.dto';
import { AgencyUserShAccount } from './agency-user-sh-account-core.entity';

export class AgencyUserShAccountCorePaginateDto extends CorePaginateDto {
  @ApiProperty({ required: true })
  @IsArray()
  list?: AgencyUserShAccount[];
}
