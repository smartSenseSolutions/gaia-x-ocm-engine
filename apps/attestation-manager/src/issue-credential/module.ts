import SchemasService from '@src/schemas/services/service';
import CredentialDefService from '@src/credentialDef/services/service';
import { Module } from '@nestjs/common';
import PrismaService from '@DB/prisma.service';
import { HttpModule } from '@nestjs/axios';
import AttestationService from '@src/issue-credential/services/service';
import AttestationController from '@src/issue-credential/controller/controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATSServices } from '@common/constants';
import NatsClientService from '@src/client/nats.client';
import RestClientService from '@src/client/rest.client';
import config from '@config/config';
import TSAClientService from '@src/client/tsa.client';
import UserInfoService from '@userInfo/services/service';

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
  controllers: [AttestationController],
  providers: [
    AttestationService,
    PrismaService,
    NatsClientService,
    RestClientService,
    CredentialDefService,
    SchemasService,
    TSAClientService,
    UserInfoService,
  ],
})
export default class AttestationModule {}
