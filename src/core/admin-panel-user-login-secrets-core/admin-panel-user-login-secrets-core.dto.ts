import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { CorePaginateDto } from 'src/shared/libs/base-query-core.dto';
import { AdminPanelUserLoginSecrets } from './admin-panel-user-login-secrets-core.entity';

export class AdminPanelUserLoginSecretsCorePaginateDto extends CorePaginateDto {
  @ApiProperty({ required: true })
  @IsArray()
  list?: AdminPanelUserLoginSecrets[];
}
