import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ColumnSetting {
  @IsNotEmpty()
  @ApiProperty()
  dataIndex: string;

  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @ApiProperty({ type: Boolean, example: true })
  @IsNotEmpty()
  visible: boolean;
}

export class SaveColumnSettingDto {
  @ApiProperty({ type: ColumnSetting, isArray: true })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ColumnSetting)
  columns?: ColumnSetting[];
}
