import { Injectable } from '@nestjs/common';
import PrismaService from '@DB/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export default class CredentialDefRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createCredDef(data: Prisma.CredentialDefCreateInput) {
    const credDef = await this.prismaService.credentialDef.create({
      data,
    });

    await this.prismaService.schema.update({
      where: {
        schemaID: data.schemaID,
      },
      data: {
        credential_defs: {
          connect: {
            id: credDef.id,
          },
        },
      },
    });

    return credDef;
  }

  async findCredentialDef(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CredentialDefWhereUniqueInput;
    where?: Prisma.CredentialDefWhereInput;
    orderBy?: Prisma.CredentialDefOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.$transaction([
      this.prismaService.credentialDef.count({
        where,
      }),
      this.prismaService.credentialDef.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      }),
    ]);
  }

  async findUniqueCredentialDef(params: {
    where: Prisma.CredentialDefWhereUniqueInput;
  }) {
    const { where } = params;
    return this.prismaService.credentialDef.findUnique({
      where,
    });
  }
}
