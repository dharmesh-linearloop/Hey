import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { EmailAccountType } from 'src/core/email-account-core/email-account-core.enum';
import { DEFAULT_ADMIN } from 'src/modules/seed/seed.keys';

export class UpdateEmailAccountDto {
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toString().toLowerCase())
  @ApiProperty({ example: DEFAULT_ADMIN.email })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    enum: EmailAccountType,
    example: EmailAccountType.Gmail,
  })
  @IsEnum(EmailAccountType)
  type: EmailAccountType;
}
