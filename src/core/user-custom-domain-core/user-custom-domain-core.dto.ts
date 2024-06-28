import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { CorePaginateDto } from 'src/shared/libs/base-query-core.dto';
import { UserCustomDomain } from './user-custom-domain-core.entity';

export class UserCustomDomainCorePaginateDto extends CorePaginateDto {
  @ApiProperty({ required: true })
  @IsArray()
  list?: UserCustomDomain[];
}
