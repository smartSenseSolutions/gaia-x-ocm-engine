import { Module } from '@nestjs/common';
import PrismaService from '@DB/prisma.service';
import { HttpModule } from '@nestjs/axios';
import SchemasService from '@src/schemas/services/service';
import SchemasController from '@src/schemas/controller/controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATSServices } from '@common/constants';
import NatsClientService from '@src/client/nats.client';
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
  controllers: [SchemasController],
  providers: [
    SchemasService,
    PrismaService,
    NatsClientService,
    RestClientService,
  ],
})
export default class SchemasModule {}
