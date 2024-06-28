import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { CorePaginateDto } from 'src/shared/libs/base-query-core.dto';
import { AdminPanelUserAccessTokens } from './admin-panel-user-access-tokens-core.entity';

export class AdminPanelUserAccessTokensCorePaginateDto extends CorePaginateDto {
  @ApiProperty({ required: true })
  @IsArray()
  list?: AdminPanelUserAccessTokens[];
}
