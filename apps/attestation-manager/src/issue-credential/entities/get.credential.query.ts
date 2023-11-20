import { IsBoolean, IsString, IsDateString } from 'class-validator';

export default class GetCredentialQuery {
  @IsString()
  page?: string;

  @IsString()
  pageSize?: string;

  @IsString()
  threadId?: string;

  @IsBoolean()
  isReceived?: boolean | string;

  @IsString()
  state?: string;

  @IsString()
  credDefId?: string;

  @IsDateString()
  createdDateStart?: string;

  @IsDateString()
  createdDateEnd?: string;

  @IsDateString()
  updatedDateStart?: string;

  @IsDateString()
  updatedDateEnd?: string;

  @IsDateString()
  expirationDateStart?: string;

  @IsDateString()
  expirationDateEnd?: string;

  @IsString()
  connectionId?: string;

  @IsString()
  principalDid?: string;
}
