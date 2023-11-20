import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Res,
  Version,
} from '@nestjs/common';
import { Response } from 'express';
import {ApiBody, ApiOperation, ApiTags} from '@nestjs/swagger';

import logger from '@utils/logger';
import UserInfoService from '@userInfo/services/service';
import UserInfoDto from '@userInfo/entities/userInfo.entity';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime';
import { isUUID } from 'class-validator';
import { AutoAcceptCredential } from '@src/common/constants';

@ApiTags('userInfo (to be deprecated)')
@Controller('userInfo')
export default class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  @Version(['1'])
  @ApiBody({ type: UserInfoDto })
  @Post('')
  @ApiOperation({
    summary: 'Add user information to a connection',
    description: 'This call provides the capability to add any additional information to connection. The format of added data is just a simple json'
  })
  async createUserInfo(
    @Body() userInfoDto: UserInfoDto,
    @Res() response: Response,
  ) {
    try {
      logger.info(`UserInfoDto: ${JSON.stringify(UserInfoDto)}`);

      const { autoAcceptCredential, connectionId, userInfo } = userInfoDto;

      if (!connectionId || !isUUID(connectionId)) {
        throw new BadRequestException('Invalid connection ID');
      }

      if (
        autoAcceptCredential &&
        autoAcceptCredential in AutoAcceptCredential
      ) {
        throw new BadRequestException('Invalid autoAcceptCredential');
      }

      if (!userInfo || Object.values(userInfo).length === 0) {
        throw new BadRequestException('Invalid userInfo');
      }

      const res = {
        statusCode: HttpStatus.CREATED,
        message: 'User info created successfully',
        data: await this.userInfoService.createUserInfo(userInfoDto),
      };
      return response.send(res);
    } catch (error: any) {
      if (error instanceof PrismaClientUnknownRequestError) {
        throw new InternalServerErrorException(error.message);
      } else {
        throw new HttpException(
          error?.message || 'Internal server error',
          error?.status || 500,
        );
      }
    }
  }
}
