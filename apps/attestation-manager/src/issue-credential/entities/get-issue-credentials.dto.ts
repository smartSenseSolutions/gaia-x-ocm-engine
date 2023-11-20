import { IsString } from 'class-validator';

export default class GetIssueCredentialsDto {
  @IsString()
  connectionId: string;
}
