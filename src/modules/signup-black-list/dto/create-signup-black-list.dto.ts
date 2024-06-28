import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { SignupBlackListType } from 'src/core/signup-black-lists-core/signup-black-lists-core.enum';

export class CreateSignupBlackListDto {
  @ApiProperty({
    required: false,
    enum: SignupBlackListType,
  })
  @IsEnum(SignupBlackListType)
  type: SignupBlackListType;

  @IsNotEmpty()
  @ApiProperty()
  value: string;

  @IsNotEmpty()
  @ApiProperty()
  reasonType: string;

  @IsNotEmpty()
  @ApiProperty()
  note: string;
}
