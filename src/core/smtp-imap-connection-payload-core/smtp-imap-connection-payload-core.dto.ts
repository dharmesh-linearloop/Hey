import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { CorePaginateDto } from 'src/shared/libs/base-query-core.dto';
import { SmtpImapConnectionPayload } from './smtp-imap-connection-payload-core.entity';

export class SmtpImapConnectionPayloadCorePaginateDto extends CorePaginateDto {
  @ApiProperty({ required: true })
  @IsArray()
  list?: SmtpImapConnectionPayload[];
}
