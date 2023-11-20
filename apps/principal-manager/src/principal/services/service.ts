import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import ResponseType from '@src/common/response';
import NatsClientService from '@src/client/nats.client';
import OfferMembershipCredentialDto from '@principal/entities/offerMembershipCredentialDto.entity';
import {
  AttestationManagerUrl,
  SaveUserInfo,
  ConnectionManagerUrl,
  CreateMemberConnection,
} from '@src/common/constants';
import MapUserInfoDTO from '@principal/entities/mapUserInfoDTO.entity';
import { HttpService } from '@nestjs/axios';

@Injectable()
export default class PrincipalService {
  constructor(
    private readonly natsClient: NatsClientService,
    private readonly httpService: HttpService,
  ) {}

  async OfferMembershipCredential(data: OfferMembershipCredentialDto) {
    const response: ResponseType = {
      statusCode: HttpStatus.OK,
      message: 'Status connection received',
    };
    this.natsClient.OfferMembershipCredential(data);
    return response;
  }

  async mapUserInfo({ userData, userInfoURL }: MapUserInfoDTO): Promise<any> {
    try {
      let userInfo;

      if (userData) {
        userInfo = userData;
      }

      if (!userInfo && userInfoURL) {
        const response = await this.httpService.axiosRef.get(userInfoURL, {
          headers: {
            // eslint is going to throw error - ignore it
            // Authorization: `${req.headers.get('Authorization')}`,
          },
        });
        userInfo = response.data;
      }

      const createConnectionBody = {
        autoAcceptConnection: true,
      };

      const userDetails = {
        connectionId: '',
        autoAcceptCredential: 'never',
        userInfo,
      };

      const { data: connection } = await this.httpService.axiosRef.post(
        `${ConnectionManagerUrl}/${CreateMemberConnection}`,
        createConnectionBody,
      );

      userDetails.connectionId = connection.data?.connection?.id;

      const { data: savedUserInfo } = await this.httpService.axiosRef.post(
        `${AttestationManagerUrl}/${SaveUserInfo}`,
        userDetails,
      );

      return {
        invitationUrl: connection.data.invitationUrl,
        userInfo: savedUserInfo.data,
      };
    } catch (error) {
      throw new HttpException(
        error?.message || 'Internal server error',
        error?.status || 500,
      );
    }
  }
}
