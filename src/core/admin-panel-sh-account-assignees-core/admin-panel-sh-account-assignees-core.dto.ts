import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { CorePaginateDto } from 'src/shared/libs/base-query-core.dto';
import { AdminPanelShAccountAssignees } from './admin-panel-sh-account-assignees-core.entity';

export class AdminPanelShAccountAssigneesCorePaginateDto extends CorePaginateDto {
  @ApiProperty({ required: true })
  @IsArray()
  list?: AdminPanelShAccountAssignees[];
}
