import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { AdminUserRole } from 'src/core/admin-panel-user-core/admin-panel-user-core.enum';

export class UpdateAdminPanelUserDto {
  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional()
  firstName: string;

  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.toString().toLowerCase())
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsEnum(AdminUserRole)
  @ApiProperty({
    required: false,
    enum: AdminUserRole,
  })
  role: AdminUserRole;
}
