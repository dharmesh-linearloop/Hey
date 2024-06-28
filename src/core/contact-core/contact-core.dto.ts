import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { CorePaginateDto } from 'src/shared/libs/base-query-core.dto';
import { Contact } from './contact-core.entity';

export class ContactCorePaginateDto extends CorePaginateDto {
  @ApiProperty({ required: true })
  @IsArray()
  list?: Contact[];
}
