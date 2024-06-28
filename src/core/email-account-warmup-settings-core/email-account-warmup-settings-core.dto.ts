import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { CorePaginateDto } from 'src/shared/libs/base-query-core.dto';
import { EmailAccountWarmupSettings } from './email-account-warmup-settings-core.entity';

export class EmailAccountWarmupSettingsCorePaginateDto extends CorePaginateDto {
  @ApiProperty({ required: true })
  @IsArray()
  list?: EmailAccountWarmupSettings[];
}
