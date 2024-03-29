import { Test, TestingModule } from '@nestjs/testing';
import httpMocks from 'node-mocks-http';
import AttestationController from '@issueCredential/controller/controller';
import AttestationService from '@issueCredential/services/service';
import AttestationServiceMock from '@issueCredential/tests/__mocks__/service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATSServices } from '@src/common/constants';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import { ResponseType } from '@src/common/response';
import CredentialDefService from '@src/credentialDef/services/service';
import CredentialDefServiceMock from '@src/credentialDef/tests/__mocks__/service';
import UserInfoService from '@userInfo/services/service';
import UserInfoServiceMock from '@userInfo/tests/__mocks__/service';
import SchemasService from '@src/schemas/services/service';
import SchemasServiceMock from '@src/schemas/tests/__mocks__/service';
import credentialDto from './stubs/credential-dto';
import GetCredentialParams from '../entities/get.credential.params';
import GetCredentialQuery from '../entities/get.credential.query';
import credentialTypeDto from './stubs/credential-type-dto';
import CredentialTypeDto from '../entities/credentialType.entity';
import CredentialStateDto from '../entities/credential.state.entity';
import credentialStateDto from './stubs/credential-state-dto';
import CredentialDto from '../entities/credential.entity';

describe('AttestationController', () => {
  let attestationController: AttestationController;
  let attestationService: AttestationService;

  beforeEach(async () => {
    const AttestationServiceProvider = {
      provide: AttestationService,
      useFactory: AttestationServiceMock,
    };

    const CredentialDefServiceProvider = {
      provide: CredentialDefService,
      useFactory: CredentialDefServiceMock,
    };

    const UserInfoServiceProvider = {
      provide: UserInfoService,
      useFactory: UserInfoServiceMock,
    };

    const SchemasServiceProvider = {
      provide: SchemasService,
      useFactory: SchemasServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: NATSServices.SERVICE_NAME,
            transport: Transport.NATS,
          },
        ]),
      ],
      controllers: [AttestationController],
      providers: [
        AttestationServiceProvider,
        CredentialDefServiceProvider,
        UserInfoServiceProvider,
        SchemasServiceProvider,
        ConfigService,
      ],
    }).compile();

    attestationController = module.get<AttestationController>(
      AttestationController,
    );
    attestationService = module.get<AttestationService>(AttestationService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(attestationController).toBeDefined();
  });

  // describe('createOfferCredential()', () => {
  //   let attestationResponse: Response<string, Record<string, any>>;

  //   beforeEach(async () => {
  //     const response = httpMocks.createResponse();
  //     attestationResponse = await attestationController.createOfferCredential(
  //       offerCredentialDto(),
  //       response,
  //     );
  //   });

  //   it('should call createOfferCredential() from service', async () => {
  //     expect(attestationService.createOfferCredential).toHaveBeenCalled();
  //   });

  //   it('should retrieve created credential', async () => {
  //     expect(
  //       attestationService.createOfferCredential(offerCredentialDto()),
  //     ).not.toBe(null);
  //   });

  //   it(`should retrieve HTTP status created(${HttpStatus.CREATED})`, async () => {
  //     expect(attestationResponse?.statusCode).toEqual(HttpStatus.CREATED);
  //   });
  // });

  describe('acceptOfferCredential()', () => {
    let attestationResponse: ResponseType;
    let query: { credentialId: string };

    beforeEach(async () => {
      query = {
        credentialId: credentialDto().credentialId,
      };

      attestationResponse = await attestationController.acceptOfferCredential(
        query,
      );
    });

    it('should call acceptRequestCredential() from service', async () => {
      expect(attestationService.acceptRequestCredential).toHaveBeenCalled();
    });

    it('should retrieve created credential', async () => {
      expect(
        attestationService.acceptRequestCredential(
          query.credentialId ? query.credentialId : '',
        ),
      ).not.toBe(null);
    });

    it(`should retrieve HTTP status accepted(${HttpStatus.ACCEPTED})`, async () => {
      expect(attestationResponse?.statusCode).toEqual(HttpStatus.ACCEPTED);
    });
  });

  describe('webHookCredentials()', () => {
    let attestationResponse: ResponseType;
    let body: { credentialRecord: CredentialStateDto };
    let credentialObj: CredentialDto;

    beforeEach(async () => {
      body = { credentialRecord: credentialStateDto() };
      credentialObj = {
        credentialId: body.credentialRecord.id,
        state: body.credentialRecord.state,
        connectionId: body.credentialRecord.connectionId,
        credDefId:
          body.credentialRecord.metadata['_internal/indyCredential']
            .credentialDefinitionId,
        threadId: body.credentialRecord.threadId,
      };

      attestationResponse = await attestationController.webHookCredentials(
        body,
      );
    });

    it('should call createCredential() from service', async () => {
      expect(attestationService.createCredential).toHaveBeenCalled();
    });

    it('should retrieve created credential', async () => {
      expect(attestationService.createCredential(credentialObj)).toEqual(
        credentialDto(),
      );
    });

    it(`should retrieve HTTP status accepted(${HttpStatus.CREATED})`, async () => {
      expect(attestationResponse?.statusCode).toEqual(HttpStatus.CREATED);
    });
  });

  describe('getCredential()', () => {
    let attestationResponse: Response<string, Record<string, any>>;
    let params: GetCredentialParams;
    let query: GetCredentialQuery;

    beforeEach(async () => {
      params = { id: credentialDto().credentialId };
      query = {
        state: credentialDto().state,
      };

      const response = httpMocks.createResponse();
      attestationResponse = await attestationController.getCredential(
        params,
        query,
        response,
      );
    });

    it('should call findCredentialById() from service', async () => {
      expect(attestationService.findCredentialById).toHaveBeenCalled();
    });

    it('should retrieve credential', async () => {
      expect(attestationService.findCredentialById(params.id)).toEqual(
        credentialDto(),
      );
    });

    it(`should retrieve HTTP status OK(${HttpStatus.OK})`, async () => {
      expect(attestationResponse?.statusCode).toEqual(HttpStatus.OK);
    });
  });

  // describe('offerMemberShipCredentials()', () => {
  //   let data: {
  //     status: string;
  //     connectionId: string;
  //     theirLabel: string;
  //     participantDID: string;
  //     theirDid: string;
  //   };
  //   let attestationResponse: ResponseType;

  //   beforeEach(async () => {
  //     data = {
  //       status: 'status',
  //       connectionId: credentialDto().connectionId,
  //       theirLabel: credentialDto().principalDid || '',
  //       participantDID,
  //       theirDid: credentialDto().principalDid || '',
  //     };

  //     attestationResponse =
  //       await attestationController.offerMemberShipCredentials(data);
  //   });

  //   it('should call issueMemberCredentials() from service', async () => {
  //     expect(attestationService.issueMemberCredentials).toHaveBeenCalled();
  //   });

  // it('should retrieve created credential', async () => {
  //   expect(
  //     attestationService.issueMemberCredentials({
  //       ...data,
  //       credDefId: credentialDto().credDefId,
  //       attributes: offerCredentialDto().attributes,
  //       autoAcceptCredential: offerCredentialDto().autoAcceptCredential,
  //     }),
  //   ).not.toBe(null);
  // });

  //   it(`should retrieve HTTP status accepted(${HttpStatus.OK})`, async () => {
  //     expect(attestationResponse?.statusCode).toEqual(HttpStatus.OK);
  //   });
  // });

  describe('createCredentialType()', () => {
    let attestationResponse: ResponseType;
    let body: CredentialTypeDto;

    beforeEach(async () => {
      body = credentialTypeDto();

      attestationResponse = await attestationController.createCredentialType(
        body,
      );
    });

    it('should call createCredentialsType() from service', async () => {
      expect(attestationService.createCredentialsType).toHaveBeenCalled();
    });

    it('should retrieve created updated credential-type', async () => {
      expect(attestationService.createCredentialsType(body)).toEqual(
        credentialTypeDto(),
      );
    });

    it(`should retrieve HTTP status created(${HttpStatus.CREATED})`, async () => {
      expect(attestationResponse?.statusCode).toEqual(HttpStatus.CREATED);
    });
  });

  // describe('getCredential()', () => {
  //   let attestationResponse: Response<string, Record<string, any>>;
  //   let query: { credentialId: string; participantId: string };

  //   beforeEach(async () => {
  //     query = {
  //       credentialId: credentialDto().credentialId,
  //       participantId: credentialDto().participantId || '',
  //     };

  //     attestationResponse = await attestationController.acceptOfferCredential(query);
  //   });
  // });
});
