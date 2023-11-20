import { Module } from '@nestjs/common';
import PrismaService from '@DB/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATSServices } from '@common/constants';
import PrincipalController from '@principal/controller/controller';
import PrincipalService from '@principal/services/service';
import NatsClientService from '@client/nats.client';
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
  controllers: [PrincipalController],
  providers: [PrincipalService, PrismaService, NatsClientService],
})
export default class PrincipalModule {}
