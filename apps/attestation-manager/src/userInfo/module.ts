import SchemasService from '@schemas/services/service';
import { Module } from '@nestjs/common';
import PrismaService from '@DB/prisma.service';
import { HttpModule } from '@nestjs/axios';
import UserInfoService from '@userInfo/services/service';
import UserInfoController from '@userInfo/controller/controller';
import NatsClientService from '@src/client/nats.client';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATSServices } from '@common/constants';
import RestClientService from '@src/client/rest.client';
import config from '@config/config';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: NATSServices.SERVICE_NAME,
        transport: Transport.NATS,
        options: {
          servers: [config().nats.url as string],
        },
      },
    ]),
  ],
  controllers: [UserInfoController],
  providers: [
    UserInfoService,
    PrismaService,
    NatsClientService,
    RestClientService,
    SchemasService,
  ],
})
export default class UserInfoModule {}
