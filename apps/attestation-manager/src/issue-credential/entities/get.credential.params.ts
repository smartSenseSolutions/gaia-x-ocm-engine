import { IsString } from 'class-validator';

export default class GetCredentialParams {
  @IsString()
  id: string;
}
