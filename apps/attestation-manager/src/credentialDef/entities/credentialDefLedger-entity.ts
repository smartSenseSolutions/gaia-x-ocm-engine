import { IsString, IsBoolean } from 'class-validator';

export default class CredentialDefLedgerDto {
  @IsString()
  schemaId: string;

  @IsBoolean()
  supportRevocation?: boolean;

  @IsString()
  tag?: string;
}
