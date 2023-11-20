import { Test, TestingModule } from '@nestjs/testing';
import PrismaService from '@DB/prisma.service';
import { HttpModule } from '@nestjs/axios';
import NatsClientService from '@src/client/nats.client';
import PrismaServiceMock from '@src/prisma/tests/__mocks__/prisma.service';
import NatsClientServiceMock from '@src/client/tests/__mocks__/nats.client';
import RestClientService from '@src/client/rest.client';
import RestClientServiceMock from '@src/client/tests/__mocks__/rest.client';
import CredentialDefService from '@src/credentialDef/services/service';
import CredentialDefServiceMock from '@src/credentialDef/tests/__mocks__/service';
import AttestationModule from '../module';
import AttestationService from '../services/service';
import AttestationServiceMock from './__mocks__/service';

describe('AttestationModule', () => {
  let attestationModule: AttestationModule;

  const AttestationServiceProvider = {
    provide: AttestationService,
    useFactory: AttestationServiceMock,
  };

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
        AttestationModule,
        AttestationServiceProvider,
        CredentialDefServiceProvider,
        PrismaServiceProvider,
        NatsClientServiceProvider,
        RestClientServiceProvider,
      ],
    }).compile();

    attestationModule = module.get<AttestationModule>(AttestationModule);
  });

  it('should be defined', () => {
    expect(attestationModule).toBeDefined();
  });
});
