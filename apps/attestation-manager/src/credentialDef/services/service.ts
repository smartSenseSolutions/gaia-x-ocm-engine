import logger from '@utils/logger';
import { Injectable } from '@nestjs/common';
import CredentialDefDto from '@src/credentialDef/entities/credentialDef-entity';
import CredentialDefRepository from '@src/credentialDef/repository/credentialDef.respository';
import PrismaService from '@DB/prisma.service';
import CredentialDefLedgerDto from '@src/credentialDef/entities/credentialDefLedger-entity';
import { Prisma } from '@prisma/client';
import pagination from '@utils/pagination';
import RestClientService from '@src/client/rest.client';
import { ConfigService } from '@nestjs/config';
import SchemasService from '@schemas/services/service';
import SchemaDto from '@src/schemas/entities/schema-entity';
import CredentialTypeRepository from '@src/issue-credential/repository/credentialType.repository';

@Injectable()
export default class CredentialDefService {
  private credentialDefRepository: CredentialDefRepository;

  private credentialTypeRepository: CredentialTypeRepository;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly restClient: RestClientService,
    private readonly configService: ConfigService,
    private readonly schemaService: SchemasService,
  ) {
    this.credentialDefRepository = new CredentialDefRepository(
      this.prismaService,
    );

    this.credentialTypeRepository = new CredentialTypeRepository(
      this.prismaService,
    );
  }

  async createCredDef(credentialDefDtoPar: CredentialDefDto) {
    const credentialDefDto: CredentialDefDto = credentialDefDtoPar;
    const schema = await this.schemaService.findBySchemaId(
      credentialDefDto.schemaID,
    );
    logger.info(`is schema already exists ${schema}`);
    if (!schema) {
      const schemaLedger =
        await this.schemaService.getSchemaAndAttributesBySchemaIDFromLedger(
          credentialDefDto.schemaID,
        );
      const schemaObj: SchemaDto = {
        schemaID: credentialDefDto.schemaID,
        name: schemaLedger.name,
        version: schemaLedger.version,
        attributes: schemaLedger.attrNames,
        createdBy: '',
        id: '',
        type: '',
        createdDate: new Date(),
        updatedDate: new Date(),
      };
      const createschema = await this.schemaService.createSchemas(schemaObj);
      logger.info(`Schema created in Database ${JSON.stringify(createschema)}`);
    }

    if (
      credentialDefDto.type &&
      typeof credentialDefDto.type === 'string' &&
      credentialDefDto.type.trim().length > 0
    ) {
      await this.credentialTypeRepository.createOrUpdateCredentialsType({
        schemaId: credentialDefDto.schemaID,
        type: credentialDefDto.type.trim(),
      });
    }
    delete credentialDefDto.type;
    return this.credentialDefRepository.createCredDef(credentialDefDto);
  }

  async findCredentialDef(pageSize: number, page: number, getSchemaID: string) {
    let query: {
      skip?: number;
      take?: number;
      cursor?: Prisma.CredentialDefWhereUniqueInput;
      where?: Prisma.CredentialDefWhereInput;
      orderBy?: Prisma.CredentialDefOrderByWithRelationInput;
    } = {};
    if (getSchemaID) {
      query.where = {
        schemaID: getSchemaID,
      };
    }
    query = { ...query, ...pagination(pageSize, page) };
    return this.credentialDefRepository.findCredentialDef(query);
  }

  async findCredentialDefBySchemaIdAndCredDefId(data: {
    schemaID: string;
    credDefId: string;
  }) {
    return this.credentialDefRepository.findCredentialDef({
      where: data,
    });
  }

  async findCredentialDefBySchemaIdDesc(data: { schemaID: string }) {
    return this.credentialDefRepository.findCredentialDef({
      where: data,
      orderBy: {
        createdDate: 'desc',
      },
    });
  }

  async findCredentialDefById(id: string) {
    return this.credentialDefRepository.findCredentialDef({
      where: { credDefId: id },
    });
  }

  async checkCredDefByNameAndSchemaID(createSchema: CredentialDefDto) {
    return this.credentialDefRepository.findCredentialDef({
      where: {
        schemaID: {
          equals: createSchema.schemaID, // Default value: default
        },
        name: {
          equals: createSchema.name, // Default mode
        },
      },
    });
  }

  async createCredDefOnLedger(credentialDefDto: CredentialDefLedgerDto) {
    const agentUrl = this.configService.get('agent.AGENT_URL');
    return this.restClient.post(
      `${agentUrl}/credential-definitions/`,
      credentialDefDto,
    );
  }
}
