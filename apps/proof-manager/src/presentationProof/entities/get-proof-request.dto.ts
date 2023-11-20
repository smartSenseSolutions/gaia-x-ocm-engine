import { IsString } from 'class-validator';

export default class GetProofRequest {
  @IsString()
  state: string;

  @IsString()
  id: string;

  @IsString()
  connectionId: string;

  isVerified?: boolean;
}
