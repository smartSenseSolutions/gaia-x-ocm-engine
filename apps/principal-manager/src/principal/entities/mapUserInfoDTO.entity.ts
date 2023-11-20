import { ApiProperty } from '@nestjs/swagger';

export type UserData = {
  [key: string]: any;
};
export default class MapUserInfoDTO {
  @ApiProperty()
  userInfoURL: string;

  @ApiProperty({ type: {} })
  userData: UserData;
}
