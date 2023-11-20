import { ApiProperty } from '@nestjs/swagger';

export default class AcceptConnectionInvitationBody {
  @ApiProperty()
  invitationUrl: string;

  @ApiProperty()
  autoAcceptConnection: boolean;
}
