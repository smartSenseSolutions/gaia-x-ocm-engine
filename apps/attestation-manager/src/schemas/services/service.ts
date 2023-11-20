import { BadRequestException, Injectable } from '@nestjs/common';
import SchemaDto from '@src/schemas/entities/schema-entity';
import SchemaRepository from '@src/schemas/repository/schema.respository';
import CredentialTypeRepository from '@src/issue-credential/repository/credentialType.repository';
import PrismaService from '@DB/prisma.service';
import NatsClientService from '@src/client/nats.client';
import { Prisma } from '@prisma/client';
import pagination from '@utils/pagination';
import RestClientService from '@src/client/rest.client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class SchemasService {
  private schemaRepository: SchemaRepository;

  private credentialTypeRepository: CredentialTypeRepository;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly restClient: RestClientService,
    private readonly natsClient: NatsClientService,
    private readonly configService: ConfigService,
  ) {
    this.schemaRepository = new SchemaRepository(this.prismaService);
    this.credentialTypeRepository = new CredentialTypeRepository(
      this.prismaService,
    );
  }

  async createSchemas(schema: SchemaDto) {
    const query: {
      schemaID: string;
      name: string;
      createdBy: string;
      attribute: {
        create: {
          schemaID: string;
          name: string;
          createdBy: string;
        }[];
      };
    } = {
      schemaID: schema.schemaID,
      name: schema.name,
      createdBy: schema.createdBy,
      attribute: {
        create: [],
      },
    };
    schema.attributes.forEach((element) => {
      query.attribute.create.push({
        schemaID: schema.schemaID,
        name: element,
        createdBy: schema.createdBy,
      });
    });

    if (
      schema.type &&
      typeof schema.type === 'string' &&
      schema.type.trim().length > 0
    ) {
      await this.credentialTypeRepository.createOrUpdateCredentialsType({
        schemaId: query.schemaID,
        type: schema.type.trim(),
      });
    }

    return this.schemaRepository.createSchema(query);
  }

  async findSchemas(pageSize: number, page: number) {
    let query: {
      skip?: number;
      take?: number;
      cursor?: Prisma.SchemaWhereUniqueInput;
      where?: Prisma.SchemaWhereInput;
      orderBy?: Prisma.SchemaOrderByWithRelationInput;
    } = {};

    query = { ...query, ...pagination(pageSize, page) };
    return this.schemaRepository.findSchemas(query);
  }

  async findSchemasById(id: string) {
    return this.schemaRepository.findSchemas({
      where: { schemaID: id },
    });
  }

  async getDidsForSchemasId(id: string) {
    return this.prismaService.schema.findMany({
      where: { schemaID: id },
      include: {
        attribute: true,
        credential_defs: {
          include: {
            credentials: {
              distinct: 'principalDid',
            },
          },
        },
      },
    });
  }

  findBySchemaId(schemaID: string) {
    const query = { where: { schemaID } };
    return this.schemaRepository.findUniqueSchema(query);
  }

  async checkSchemasByNameAndVersion(schemaDto: SchemaDto) {
    return this.schemaRepository.findSchemas({
      where: {
        schemaID: {
          endsWith: `:${schemaDto.version}`,
          mode: 'insensitive', // Default value: default
        },
        name: {
          equals: schemaDto.name, // Default mode
        },
      },
    });
  }

  async createSchemaOnLedger(schemaDto: SchemaDto) {
    const agentUrl = this.configService.get('agent.AGENT_URL');
    const responseData = await this.restClient.post(
      `${agentUrl}/schemas/`,
      schemaDto,
    );

    return responseData;
  }

  async getSchemaAndAttributesBySchemaIDFromLedger(schemaID: string) {
    const agentUrl = this.configService.get('agent.AGENT_URL');
    const responseData = await this.restClient.get(
      `${agentUrl}/schemas/${schemaID}`,
    );

    if (!responseData?.id) {
      throw new BadRequestException('Invalid schema ID');
    }

    return responseData;
  }
}
