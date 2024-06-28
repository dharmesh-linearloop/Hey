import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { DEFAULT_OTP } from 'src/keys';
import { DEFAULT_ADMIN } from 'src/modules/seed/seed.keys';

export class AdminLoginDto {
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toString().toLowerCase())
  @ApiProperty({ example: DEFAULT_ADMIN.email })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: DEFAULT_ADMIN.password })
  password: string;

  @IsOptional()
  @ApiPropertyOptional({ example: '' })
  captchaToken?: string;
}

export class AdminLoginSocialDto {
  @IsNotEmpty()
  @ApiProperty()
  code: string;

  @IsOptional()
  @ApiPropertyOptional({ example: '' })
  captchaToken?: string;
}

export class VerifyAdminLoginOtpDto {
  @IsNotEmpty()
  @ApiProperty({ example: DEFAULT_OTP })
  otp: number;

  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @ApiProperty()
  otpRef: string;
}

export class ResendAdminLoginOtpDto {
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @ApiProperty()
  otpRef: string;
}

export class InvitationTokenDto {
  @IsNotEmpty()
  @ApiProperty()
  invitationToken: string;
}
