import { Injectable } from '@nestjs/common';
import PrismaService from '@DB/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export default class UserInfoRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createUserInfo(data: Prisma.UserInfoCreateInput) {
    const userInfo = await this.prismaService.userInfo.create({
      data,
    });

    return userInfo;
  }

  async updateUserInfo(data: Prisma.UserInfoUncheckedUpdateManyInput) {
    const userInfo = await this.prismaService.userInfo.updateMany({
      where: {
        connectionId: data.connectionId as string,
      },
      data,
    });

    return userInfo;
  }

  async getUserInfo(params: { where: Prisma.UserInfoWhereInput }) {
    const { where } = params;
    return this.prismaService.userInfo.findFirst({
      where,
    });
  }
}
