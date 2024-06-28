import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAdminPanelTagDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
