import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { CorePaginateDto } from 'src/shared/libs/base-query-core.dto';
import { AdminPanelShAccountNotes } from './admin-panel-sh-account-notes-core.entity';

export class AdminPanelShAccountNotesCorePaginateDto extends CorePaginateDto {
  @ApiProperty({ required: true })
  @IsArray()
  list?: AdminPanelShAccountNotes[];
}
