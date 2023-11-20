import { IsString } from 'class-validator';

export default class AcceptProofRequestDto {
  @IsString()
  proofRecordId: string;
}
