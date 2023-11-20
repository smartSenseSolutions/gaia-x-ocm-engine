import { Injectable } from '@nestjs/common';
import PrismaService from '@DB/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export default class CredentialsTypeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createCredentialsType(data: Prisma.CredentialsTypeCreateInput) {
    return this.prismaService.credentialsType.create({ data });
  }

  async createOrUpdateCredentialsType(data: Prisma.CredentialsTypeCreateInput) {
    const credentialType = await this.prismaService.credentialsType.findFirst({
      where: {
        type: {
          equals: data.type,
          mode: 'insensitive',
        },
      },
    });

    if (credentialType) {
      return this.prismaService.credentialsType.update({
        where: {
          id: credentialType.id,
        },
        data,
      });
    }
    const credentialTypeSchemaCheck =
      await this.prismaService.credentialsType.findFirst({
        where: {
          schemaId: {
            equals: data.schemaId,
          },
        },
      });
    if (credentialTypeSchemaCheck) {
      return this.prismaService.credentialsType.update({
        where: {
          id: credentialTypeSchemaCheck.id,
        },
        data,
      });
    }

    return this.prismaService.credentialsType.create({
      data,
    });
  }

  async findUniqueCredentialsType(data: { type: string }) {
    return this.prismaService.credentialsType.findFirst({
      where: {
        type: {
          equals: data.type,
          mode: 'insensitive',
        },
      },
    });
  }

  // TODO check
  async updateCredentialsType(params: {
    where: Prisma.CredentialsTypeWhereUniqueInput;
    data: Prisma.CredentialsTypeUpdateInput;
  }) {
    const { where, data } = params;
    return this.prismaService.credentialsType.update({
      data,
      where,
    });
  }

  async findCredentialsType(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CredentialsTypeWhereUniqueInput;
    where?: Prisma.CredentialsTypeWhereInput;
    orderBy?: Prisma.CredentialsTypeOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prismaService.$transaction([
      this.prismaService.credentialsType.count({
        where: {
          ...where,
        },
      }),
      this.prismaService.credentialsType.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      }),
    ]);
  }
}
