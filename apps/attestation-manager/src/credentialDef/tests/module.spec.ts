import { Test, TestingModule } from '@nestjs/testing';
import PrismaService from '@DB/prisma.service';
import { HttpModule } from '@nestjs/axios';
import NatsClientService from '@src/client/nats.client';
import PrismaServiceMock from '@src/prisma/tests/__mocks__/prisma.service';
import NatsClientServiceMock from '@src/client/tests/__mocks__/nats.client';
import RestClientService from '@src/client/rest.client';
import RestClientServiceMock from '@src/client/tests/__mocks__/rest.client';
import CredentialDefModule from '../module';
import CredentialDefService from '../services/service';
import CredentialDefServiceMock from './__mocks__/service';

describe('CredentialDefModule', () => {
  let credentialDefModule: CredentialDefModule;

  const CredentialDefServiceProvider = {
    provide: CredentialDefService,
    useFactory: CredentialDefServiceMock,
  };

  const PrismaServiceProvider = {
    provide: PrismaService,
    useFactory: PrismaServiceMock,
  };

  const NatsClientServiceProvider = {
    provide: NatsClientService,
    useFactory: NatsClientServiceMock,
  };

  const RestClientServiceProvider = {
    provide: RestClientService,
    useFactory: RestClientServiceMock,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        CredentialDefModule,
        CredentialDefServiceProvider,
        PrismaServiceProvider,
        NatsClientServiceProvider,
        RestClientServiceProvider,
      ],
    }).compile();

    credentialDefModule = module.get<CredentialDefModule>(CredentialDefModule);
  });

  it('should be defined', () => {
    expect(credentialDefModule).toBeDefined();
  });
});
