import { IsString } from 'class-validator';

export default class GetPresentProofsDto {
  @IsString()
  connectionId: string;
}
