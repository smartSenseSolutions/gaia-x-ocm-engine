import { Test, TestingModule } from '@nestjs/testing';
import SchemasService from '@schemas/services/service';
import PrismaService from '@DB/prisma.service';
import { HttpModule } from '@nestjs/axios';
import NatsClientService from '@src/client/nats.client';
import PrismaServiceMock from '@src/prisma/tests/__mocks__/prisma.service';
import NatsClientServiceMock from '@src/client/tests/__mocks__/nats.client';
import RestClientService from '@src/client/rest.client';
import RestClientServiceMock from '@src/client/tests/__mocks__/rest.client';
import { ConfigService } from '@nestjs/config';
import SchemasModule from '../module';
import SchemasServiceMock from './__mocks__/service';

describe('SchemasModule', () => {
  let schemasModule: SchemasModule;

  const SchemasServiceProvider = {
    provide: SchemasService,
    useFactory: SchemasServiceMock,
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
        SchemasModule,
        SchemasServiceProvider,
        PrismaServiceProvider,
        NatsClientServiceProvider,
        RestClientServiceProvider,
        ConfigService,
      ],
    }).compile();

    schemasModule = module.get<SchemasModule>(SchemasModule);
  });

  it('should be defined', () => {
    expect(schemasModule).toBeDefined();
  });
});
