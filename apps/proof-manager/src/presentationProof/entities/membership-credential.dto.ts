import { IsString } from 'class-validator';

export default class MembershipCredentialDto {
  @IsString()
  connectionId: string;

  attributes: {
    attributeName: string;
    schemaId?: string;
    credentialDefId?: string;
  }[];
}
