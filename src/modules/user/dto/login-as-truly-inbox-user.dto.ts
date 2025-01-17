import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginAsTrulyInboxUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}
