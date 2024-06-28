import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { AdminUserRole } from 'src/core/admin-panel-user-core/admin-panel-user-core.enum';

export class CreateAdminPanelUserDto {
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.toString().toLowerCase())
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @IsEnum(AdminUserRole)
  @ApiProperty({
    required: false,
    enum: AdminUserRole,
  })
  role: AdminUserRole;
}

export class AdminPanelUserChangePasswordDto {
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export class ReSendTokenUrlToEmailDto {
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.toString().toLowerCase())
  @ApiProperty()
  email: string;
}
