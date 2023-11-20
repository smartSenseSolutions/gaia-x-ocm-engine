import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';

type UserInfo = {
  [key: string]: any;
};
export default class UserInfoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  connectionId: string;

  @IsEnum(['always', 'contentApproved', 'never'])
  @IsNotEmpty()
  @ApiProperty()
  autoAcceptCredential: string;

  @IsNotEmpty()
  @ApiProperty({ type: {} })
  userInfo: UserInfo;
}
