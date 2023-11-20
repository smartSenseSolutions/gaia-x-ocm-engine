import { Test, TestingModule } from '@nestjs/testing';
import SchemasService from '@schemas/services/service';
import PrismaService from '@DB/prisma.service';
import { HttpModule } from '@nestjs/axios';
import NatsClientService from '@src/client/nats.client';
import { Schema } from '@prisma/client';
import { ResponseType } from '@src/common/response';
import PrismaServiceMock from '@src/prisma/tests/__mocks__/prisma.service';
import NatsClientServiceMock from '@src/client/tests/__mocks__/nats.client';
import RestClientService from '@src/client/rest.client';
import RestClientServiceMock from '@src/client/tests/__mocks__/rest.client';
import { ConfigService } from '@nestjs/config';
import schemaDto from './stubs/schema-dto';

describe('SchemasService', () => {
  let schemasService: SchemasService;

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
        SchemasService,
        PrismaServiceProvider,
        RestClientServiceProvider,
        NatsClientServiceProvider,
        ConfigService,
      ],
    }).compile();

    schemasService = module.get<SchemasService>(SchemasService);
  });

  it('should be defined', () => {
    expect(schemasService).toBeDefined();
  });

  describe('createSchemas()', () => {
    let schemasResponse: Schema;

    beforeEach(async () => {
      schemasResponse = await schemasService.createSchemas(schemaDto());
    });

    it('should call create() from PrismaService.schema', async () => {
      expect(PrismaServiceMock().schema.create).toHaveBeenCalled();
    });

    it('should retrieve created schema', async () => {
      expect(schemasResponse).toEqual([schemaDto()]);
    });
  });

  describe('findSchemas()', () => {
    let schemasResponse: Array<number | Schema[]>;

    beforeEach(async () => {
      const pageSize = parseInt(schemaDto().pageSize || '', 10);
      const page = parseInt(schemaDto().page || '', 10);

      schemasResponse = await schemasService.findSchemas(pageSize, page);
    });

    it('should call findMany() from PrismaService.schema', async () => {
      expect(PrismaServiceMock().schema.findMany).toHaveBeenCalled();
    });

    it('should call count() from PrismaService.schema', async () => {
      expect(PrismaServiceMock().schema.count).toHaveBeenCalled();
    });

    it('should call $transaction() from PrismaService', async () => {
      expect(PrismaServiceMock().$transaction).toHaveBeenCalled();
    });

    it('should retrieve schemas by participantId', async () => {
      expect(schemasResponse).toEqual([1, [schemaDto()]]);
    });
  });

  describe('findSchemasById()', () => {
    let schemasResponse: Array<number | Schema[]>;
    let id: string;

    beforeEach(async () => {
      id = schemaDto().schemaID || '';

      schemasResponse = await schemasService.findSchemasById(id);
    });

    it('should call findMany() from PrismaService.schema', async () => {
      expect(PrismaServiceMock().schema.findMany).toHaveBeenCalled();
    });

    it('should call count() from PrismaService.schema', async () => {
      expect(PrismaServiceMock().schema.count).toHaveBeenCalled();
    });

    it('should call $transaction() from PrismaService', async () => {
      expect(PrismaServiceMock().$transaction).toHaveBeenCalled();
    });

    it('should retrieve schema by Schema ID', async () => {
      expect(schemasResponse).toEqual([1, [schemaDto()]]);
    });
  });

  describe('checkSchemasByNameAndVersion()', () => {
    let schemasResponse: Array<number | Schema[]>;

    beforeEach(async () => {
      schemasResponse = await schemasService.checkSchemasByNameAndVersion(
        schemaDto(),
      );
    });

    it('should call findMany() from PrismaService.schema', async () => {
      expect(PrismaServiceMock().schema.findMany).toHaveBeenCalled();
    });

    it('should call count() from PrismaService.schema', async () => {
      expect(PrismaServiceMock().schema.count).toHaveBeenCalled();
    });

    it('should call $transaction() from PrismaService', async () => {
      expect(PrismaServiceMock().$transaction).toHaveBeenCalled();
    });

    it('should retrieve schemas by Name and Version', async () => {
      expect(schemasResponse).toEqual([1, [schemaDto()]]);
    });
  });

  describe('createSchemaOnLedger()', () => {
    let schemasResponse: ResponseType;

    beforeEach(async () => {
      schemasResponse = await schemasService.createSchemaOnLedger(schemaDto());
    });

    it('should call post() from restClient', async () => {
      expect(RestClientServiceMock().post).toHaveBeenCalled();
    });

    it('should get a response from AFJ', async () => {
      expect(schemasResponse).not.toBe(null);
    });
  });
});
