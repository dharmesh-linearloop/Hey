import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { CorePaginateDto } from 'src/shared/libs/base-query-core.dto';
import { UserDefaultSchedule } from './user-default-schedule-core.entity';

export class UserDefaultScheduleCorePaginateDto extends CorePaginateDto {
  @ApiProperty({ required: true })
  @IsArray()
  list?: UserDefaultSchedule[];
}
