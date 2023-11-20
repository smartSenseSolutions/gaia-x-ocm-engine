import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class ConnectionCreateInvitationDto {
  @IsString()
  @ApiProperty()
  autoAcceptConnection?: boolean;

  @IsString()
  @ApiProperty()
  alias?: string;

  @IsString()
  @ApiProperty()
  myLabel?: string;

  @IsString()
  @ApiProperty()
  myImageUrl?: string;
}
