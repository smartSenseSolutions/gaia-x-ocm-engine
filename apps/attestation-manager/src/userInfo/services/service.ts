import logger from '@utils/logger';
import { Injectable } from '@nestjs/common';
import UserInfoDto from '@userInfo/entities/userInfo.entity';
import UpdateUserInfoDto from '@userInfo/entities/update-unserInfo.dto';
import UserInfoRepository from '@userInfo/repository/userInfo.respository';
import PrismaService from '@DB/prisma.service';

@Injectable()
export default class UserInfoService {
  private userInfoRepository: UserInfoRepository;

  constructor(private readonly prismaService: PrismaService) {
    this.userInfoRepository = new UserInfoRepository(this.prismaService);
  }

  async createUserInfo(userInfoDto: UserInfoDto) {
    logger.info(`In user info service, ${JSON.stringify(userInfoDto)}`);
    return this.userInfoRepository.createUserInfo({
      autoAcceptCredential: userInfoDto.autoAcceptCredential,
      connectionId: userInfoDto.connectionId,
      userInfo: userInfoDto.userInfo as object,
    });
  }

  async updateUserInfo(userInfoDto: UpdateUserInfoDto) {
    logger.info(`In user info service, ${userInfoDto}`);
    return this.userInfoRepository.updateUserInfo({
      connectionId: userInfoDto.connectionId,
      credentialDefinitionId: userInfoDto.credentialDefinitionId,
      status: userInfoDto.status,
      userInfo: userInfoDto.userInfo as object,
    });
  }

  async getUserInfo(connectionId: string) {
    logger.info(`In get user info service, ${connectionId}`);
    return this.userInfoRepository.getUserInfo({
      where: {
        connectionId,
      },
    });
  }
}
