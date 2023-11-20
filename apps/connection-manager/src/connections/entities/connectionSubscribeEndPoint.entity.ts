import { IsString, IsNotEmpty } from 'class-validator';

export default class ConnectionSubscriptionEndpointDto {
  @IsString()
  @IsNotEmpty()
  connectionId: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
