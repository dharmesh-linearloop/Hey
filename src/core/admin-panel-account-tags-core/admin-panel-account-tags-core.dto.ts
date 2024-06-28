import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { CorePaginateDto } from 'src/shared/libs/base-query-core.dto';
import { AdminPanelAccountTags } from './admin-panel-account-tags-core.entity';

export class AdminPanelAccountTagsCorePaginateDto extends CorePaginateDto {
  @ApiProperty({ required: true })
  @IsArray()
  list?: AdminPanelAccountTags[];
}
