import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { CorePaginateDto } from 'src/shared/libs/base-query-core.dto';
import { AdminPanelUserApplicationSettings } from './admin-panel-user-application-settings-core.entity';

export class AdminPanelUserApplicationSettingsCorePaginateDto extends CorePaginateDto {
  @ApiProperty({ required: true })
  @IsArray()
  list?: AdminPanelUserApplicationSettings[];
}
