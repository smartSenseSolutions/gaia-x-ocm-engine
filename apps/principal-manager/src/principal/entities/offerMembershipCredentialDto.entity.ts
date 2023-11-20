import { IsString, IsNotEmpty } from 'class-validator';

export default class OfferMembershipCredentialDto {
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  connectionId: string;

  @IsString()
  @IsNotEmpty()
  theirLabel: string;

  @IsString()
  @IsNotEmpty()
  participantDID: string;

  @IsString()
  @IsNotEmpty()
  theirDid: string;
}
