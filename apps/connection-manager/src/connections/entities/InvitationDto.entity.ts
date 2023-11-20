import { IsString } from 'class-validator';

export default class InvitationDTO {
  @IsString()
  serviceEndpoint?: string;

  @IsString()
  ['@type']?: string;

  @IsString()
  ['@id']?: string;

  @IsString()
  label?: string;

  @IsString()
  recipientKeys?: [string];

  @IsString()
  routingKeys?: [];
}
