import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { CorePaginateDto } from 'src/shared/libs/base-query-core.dto';
import { SequenceStepVariantAttachment } from './sequence-step-variant-attachment-core.entity';

export class SequenceStepVariantAttachmentCorePaginateDto extends CorePaginateDto {
  @ApiProperty({ required: true })
  @IsArray()
  list?: SequenceStepVariantAttachment[];
}
