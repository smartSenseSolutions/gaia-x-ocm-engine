import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import InvitationDTO from '@src/presentationProof/entities/get-proof-request.dto';

export default class SendProofRequestBody {
  @ApiProperty({ example: 'comments' })
  comment?: string;

  @IsString()
  status?: string;

  @ApiProperty({ example: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag' })
  @IsString()
  schemaId: string;

  @IsString()
  theirDID?: string;

  @IsString()
  presentationMessage?: string;

  @ApiProperty({
    example: {
      type: 'Aries1.0',
      credentialDefinitionId: 'credentialDefinitionId',
    },
  })
  options?: {
    type: string;
    credentialDefinitionId: string;
  };

  @IsString()
  invitation?: InvitationDTO;

  @ApiProperty({ example: ['attributeName'] })
  attributes: [
    {
      attributeName: string;
      schemaId: string;
      credentialDefId: string;
      value: string;
      condition: string;
    },
  ];
}
