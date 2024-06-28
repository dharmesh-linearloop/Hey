import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { CorePaginateDto } from 'src/shared/libs/base-query-core.dto';
import { SequenceContactHistory } from './sequence-contact-history-core.entity';

export class SequenceContactHistoryCorePaginateDto extends CorePaginateDto {
  @ApiProperty({ required: true })
  @IsArray()
  list?: SequenceContactHistory[];
}
