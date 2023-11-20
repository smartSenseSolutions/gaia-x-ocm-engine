import { IsString, IsNotEmpty } from 'class-validator';
import InvitationDTO from './InvitationDto.entity';

export default class ConnectionStateDto {
  @IsString()
  ['_tags']?: any;

  @IsString()
  metadata?: any;

  @IsString()
  didDoc?: any;

  @IsString()
  verkey?: string;

  @IsString()
  createdAt?: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  did: string;

  @IsString()
  theirDid: string;

  @IsString()
  theirLabel: string;

  @IsString()
  invitation: InvitationDTO;

  @IsString()
  alias: string;

  multiUseInvitation?: boolean;
}
