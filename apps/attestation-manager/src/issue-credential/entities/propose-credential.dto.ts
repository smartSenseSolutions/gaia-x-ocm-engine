import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export default class ProposeCredentialDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  connectionId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  credentialDefinitionId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  comment: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  credentialProposal: {
    '@type': string;
    attributes: {
      name: string;
      value: string;
    }[];
  };

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  autoAcceptCredential: string;
}
