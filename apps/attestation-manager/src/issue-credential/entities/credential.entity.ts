import { IsString, IsNotEmpty } from 'class-validator';

export default class CredentialDto {
  @IsString()
  @IsNotEmpty()
  credentialId: string;

  @IsString()
  @IsNotEmpty()
  credDefId: string;

  @IsString()
  schemaId?: string;

  @IsString()
  @IsNotEmpty()
  participantId?: string;

  @IsString()
  @IsNotEmpty()
  principalDid?: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  threadId: string;

  @IsString()
  @IsNotEmpty()
  connectionId: string;

  @IsString()
  expirationDate?: Date | null;
}
