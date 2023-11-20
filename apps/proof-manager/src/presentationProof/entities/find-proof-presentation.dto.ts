import { IsNumber, IsString, IsDateString } from 'class-validator';

export default class FindProofPresentationDto {
  @IsNumber()
  page: string;

  @IsNumber()
  pageSize: string;

  @IsString()
  proofRecordId: string;

  @IsString()
  connectionId: string;

  @IsString()
  credentialDefId: string;

  @IsString()
  schemaId: string;

  @IsString()
  theirDid: string;

  @IsString()
  status: string;

  @IsDateString()
  createdDateStart: string;

  @IsDateString()
  createdDateEnd: string;

  @IsDateString()
  updatedDateStart: string;

  @IsDateString()
  updatedDateEnd: string;
}
