import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { CorePaginateDto } from 'src/shared/libs/base-query-core.dto';
import { LeadFinderRevealHistory } from './lead-finder-reveal-history-core.entity';

export class LeadFinderRevealHistoryCorePaginateDto extends CorePaginateDto {
  @ApiProperty({ required: true })
  @IsArray()
  list?: LeadFinderRevealHistory[];
}
