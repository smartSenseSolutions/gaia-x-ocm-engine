import ResponseType from '@common/response';
import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  Version, // Post, Version, Body, Res, Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { isURL } from 'class-validator';

import PrincipalService from '@principal/services/service';
import logger from '@src/utils/logger';
import { MessagePattern } from '@nestjs/microservices';
import { NATSServices } from '@common/constants';
import OfferMembershipCredentialDto from '@principal/entities/offerMembershipCredentialDto.entity';
import MapUserInfoDTO from '@principal/entities/mapUserInfoDTO.entity';

@Controller()
export default class PrincipalController {
  name: string;

  constructor(private readonly principalService: PrincipalService) {}

  @MessagePattern({
    endpoint: `${NATSServices.SERVICE_NAME}/connectionCompleteStatus`,
  })
  async connectionComplete(data: OfferMembershipCredentialDto) {
    logger.info(
      `call from connection manager for  OfferMembershipCredentialDto ${OfferMembershipCredentialDto}`,
    );
    let response: ResponseType = {
      statusCode: HttpStatus.OK,
      message: 'Status connection received',
    };
    if (data.status.toUpperCase() === 'COMPLETE') {
      this.principalService.OfferMembershipCredential(data);
      return response;
    }

    response = {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Connection status should be Complete',
    };
    return response;
  }

  @Version(['1'])
  @Post('map-user-info')
  async mapUserInfo(
    @Body() tokenBody: MapUserInfoDTO,
    @Res() response: Response,
    @Req() req: Request, // eslint-disable-line @typescript-eslint/no-unused-vars
  ) {
    try {
      const { userInfoURL, userData } = tokenBody;

      if (
        (!userData ||
          typeof userData !== 'object' ||
          Object.keys(userData).length === 0) &&
        (!userInfoURL || !isURL(userInfoURL))
      ) {
        throw new BadRequestException('Invalid user data or user info url');
      }

      const res = {
        statusCode: HttpStatus.CREATED,
        message: 'User info mapped successfully',
        data: await this.principalService.mapUserInfo(tokenBody),
      };

      return response.send(res);
    } catch (error) {
      throw new HttpException(
        error?.message || 'Internal server error',
        error?.status || 500,
      );
    }
  }

  // listen for complete connection event and filter based
  // on matching connection ids from database that have userInfo
  // once COMPLETE:
  // * map userInfo to VC
  // * issue VC to did of matching complete connection ID
  // * if (issuing successful) delete record from DB
}
