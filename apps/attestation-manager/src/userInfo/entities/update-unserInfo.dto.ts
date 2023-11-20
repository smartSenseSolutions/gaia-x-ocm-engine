type UserInfo = {
  [key: string]: any;
};

export default class UpdateUserInfoDto {
  connectionId: string;

  status: string;

  credentialDefinitionId: string;

  userInfo: UserInfo;
}
