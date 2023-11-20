import { IsString, IsNotEmpty } from 'class-validator';

export default class CredentialStateDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  metadata: {
    '_internal/indyCredential': {
      credentialDefinitionId: string;
      schemaId: string;
    };
  };

  @IsString()
  @IsNotEmpty()
  credDefId: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  threadId: string;

  @IsString()
  @IsNotEmpty()
  connectionId: string;
}
