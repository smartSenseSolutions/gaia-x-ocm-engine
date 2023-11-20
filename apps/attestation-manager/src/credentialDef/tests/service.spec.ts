import CredentialDefService from '@credentialDef/services/service';
import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { CredentialDef } from '@prisma/client';
import NatsClientService from '@src/client/nats.client';
import NatsClientServiceMock from '@src/client/tests/__mocks__/nats.client';
import PrismaService from '@src/prisma/prisma.service';
import PrismaServiceMock from '@src/prisma/tests/__mocks__/prisma.service';
import RestClientService from '@src/client/rest.client';
import RestClientServiceMock from '@src/client/tests/__mocks__/rest.client';
import { ConfigService } from '@nestjs/config';
import SchemasService from '@src/schemas/services/service';
import SchemasServiceMock from '@src/schemas/tests/__mocks__/service';
import credDefStub from './stubs/credDef.stub';

describe('CredentialDefService', () => {
  let credDefService: CredentialDefService;

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

  const SchemasServiceProvider = {
    provide: SchemasService,
    useFactory: SchemasServiceMock,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        CredentialDefService,
        PrismaServiceProvider,
        NatsClientServiceProvider,
        RestClientServiceProvider,
        ConfigService,
        SchemasServiceProvider,
      ],
    }).compile();

    credDefService = module.get<CredentialDefService>(CredentialDefService);
  });

  it('should be defined', () => {
    expect(credDefService).toBeDefined();
  });

  describe('createCredDef()', () => {
    let credDefResponse: CredentialDef;

    beforeEach(async () => {
      credDefResponse = await credDefService.createCredDef(credDefStub());
    });

    it('should call create() from PrismaService', async () => {
      expect(PrismaServiceMock().credentialDef.create).toHaveBeenCalled();
    });

    it('should retrieve credDef by participantId', async () => {
      expect(credDefResponse).toEqual([credDefStub()]);
    });
  });

  describe('findCredentialDef()', () => {
    let credDefResponse: Array<number | CredentialDef[]>;
    let id: string;

    beforeEach(async () => {
      const pageSize = 10;
      const page = 10;
      id = credDefStub().credDefId;

      credDefResponse = await credDefService.findCredentialDef(
        pageSize,
        page,
        id,
      );
    });

    it('should call findMany() from PrismaService.credentialDef', async () => {
      expect(PrismaServiceMock().credentialDef.findMany).toHaveBeenCalled();
    });

    it('should call count() from PrismaService.credentialDef', async () => {
      expect(PrismaServiceMock().credentialDef.count).toHaveBeenCalled();
    });

    it('should call $transaction() from PrismaService', async () => {
      expect(PrismaServiceMock().$transaction).toHaveBeenCalled();
    });

    it('should retrieve schema by ID', async () => {
      expect(credDefResponse).toEqual([1, [credDefStub()]]);
    });
  });

  describe('findCredentialDefById()', () => {
    let credDefResponse: Array<number | CredentialDef[]>;
    let id: string;

    beforeEach(async () => {
      id = credDefStub().credDefId;

      credDefResponse = await credDefService.findCredentialDefById(id);
    });

    it('should call findMany() from PrismaService.credentialDef', async () => {
      expect(PrismaServiceMock().credentialDef.findMany).toHaveBeenCalled();
    });

    it('should call count() from PrismaService.credentialDef', async () => {
      expect(PrismaServiceMock().credentialDef.count).toHaveBeenCalled();
    });

    it('should call $transaction() from PrismaService', async () => {
      expect(PrismaServiceMock().$transaction).toHaveBeenCalled();
    });

    it('should retrieve schema by ID', async () => {
      expect(credDefResponse).toEqual([1, [credDefStub()]]);
    });
  });

  describe('checkCredDefByNameAndSchemaID()', () => {
    let credDefResponse: Array<number | CredentialDef[]>;

    beforeEach(async () => {
      credDefResponse = await credDefService.checkCredDefByNameAndSchemaID(
        credDefStub(),
      );
    });

    it('should call findMany() from PrismaService.credentialDef', async () => {
      expect(PrismaServiceMock().credentialDef.findMany).toHaveBeenCalled();
    });

    it('should call count() from PrismaService.credentialDef', async () => {
      expect(PrismaServiceMock().credentialDef.count).toHaveBeenCalled();
    });

    it('should call $transaction() from PrismaService', async () => {
      expect(PrismaServiceMock().$transaction).toHaveBeenCalled();
    });

    it('should retrieve credDef by Name and Schema ID', async () => {
      expect(credDefResponse).toEqual([1, [credDefStub()]]);
    });
  });

  describe('createCredDefOnLedger()', () => {
    let credDefResponse: Array<number | CredentialDef[]>;

    beforeEach(async () => {
      credDefResponse = await credDefService.createCredDefOnLedger({
        schemaId: credDefStub().schemaID,
        supportRevocation: credDefStub().supportRevocation,
        tag: credDefStub().tag,
      });
    });

    it('should call post() from restClient', async () => {
      expect(RestClientServiceMock().post).toHaveBeenCalled();
    });

    it('should get a response from AFJ', async () => {
      expect(credDefResponse).not.toBe(null);
    });
  });
});
