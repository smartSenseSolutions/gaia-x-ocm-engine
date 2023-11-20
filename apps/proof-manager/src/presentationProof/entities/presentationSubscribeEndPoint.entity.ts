import { IsString, IsNotEmpty } from 'class-validator';

export default class PresentationSubscriptionEndpointDto {
  @IsString()
  @IsNotEmpty()
  proofRecordId: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
