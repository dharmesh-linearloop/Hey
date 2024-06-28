import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { CorePaginateDto } from 'src/shared/libs/base-query-core.dto';
import { PlanRestriction } from './plan-restriction-core.entity';

export class PlanRestrictionCorePaginateDto extends CorePaginateDto {
  @ApiProperty({ required: true })
  @IsArray()
  list?: PlanRestriction[];
}
