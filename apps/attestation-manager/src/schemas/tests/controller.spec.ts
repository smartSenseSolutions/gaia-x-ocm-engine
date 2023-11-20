import { Test, TestingModule } from '@nestjs/testing';
import httpMocks from 'node-mocks-http';
import SchemasController from '@schemas/controller/controller';
import SchemasService from '@schemas/services/service';
import SchemasServiceMock from '@schemas/tests/__mocks__/service';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import SchemaDto from '../entities/schema-entity';
import schemaDto from './stubs/schema-dto';

describe('SchemasController', () => {
  let schemasController: SchemasController;
  let schemasService: SchemasService;

  beforeEach(async () => {
    const SchemasServiceProvider = {
      provide: SchemasService,
      useFactory: SchemasServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchemasController],
      providers: [SchemasServiceProvider],
    }).compile();

    schemasController = module.get<SchemasController>(SchemasController);
    schemasService = module.get<SchemasService>(SchemasService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(schemasController).toBeDefined();
  });

  describe('findSchemas()', () => {
    let schemasResponse: Response<string, Record<string, any>>;
    let query: SchemaDto;
    let response: Response<string, Record<string, any>>;

    beforeEach(async () => {
      query = schemaDto();
      response = httpMocks.createResponse();

      schemasResponse = await schemasController.findSchemas(query, response);
    });

    it('should call findSchemas() from service', async () => {
      expect(schemasService.findSchemas).toHaveBeenCalled();
    });

    it('should retrieve schemas by query', async () => {
      expect(
        schemasService.findSchemas(
          query.pageSize ? parseInt(query.pageSize, 10) : 10,
          query.page ? parseInt(query.page, 10) : 0,
        ),
      ).toEqual([1, [schemaDto()]]);
    });

    it(`should retrieve HTTP status OK(${HttpStatus.OK})`, async () => {
      expect(schemasResponse?.statusCode).toEqual(HttpStatus.OK);
    });
  });

  describe('findSchemasById()', () => {
    let schemasResponse: Response<string, Record<string, any>>;
    let id: string;
    let response: Response<string, Record<string, any>>;

    beforeEach(async () => {
      id = schemaDto().schemaID || '';
      response = httpMocks.createResponse();

      schemasResponse = await schemasController.findSchemasById(id, response);
    });

    it('should call findSchemasById() from service', async () => {
      expect(schemasService.findSchemasById).toHaveBeenCalled();
    });

    it('should retrieve schema by ID', async () => {
      expect(schemasService.findSchemasById(id)).toEqual([1, [schemaDto()]]);
    });

    it(`should retrieve HTTP status OK(${HttpStatus.OK})`, async () => {
      expect(schemasResponse?.statusCode).toEqual(HttpStatus.OK);
    });
  });

  describe('createSchema()', () => {
    let schemasResponse: Response<string, Record<string, any>>;
    let createSchema: SchemaDto;
    let response: Response<string, Record<string, any>>;

    beforeEach(async () => {
      createSchema = schemaDto();
      response = httpMocks.createResponse();

      schemasResponse = await schemasController.createSchema(
        createSchema,
        response,
      );
    });

    it('should call checkSchemasByNameAndVersion() from service', async () => {
      expect(schemasService.checkSchemasByNameAndVersion).toHaveBeenCalled();
    });

    it('should not retrieve any existing schema', async () => {
      expect(
        schemasService.checkSchemasByNameAndVersion(createSchema),
      ).toContain(0);
    });

    it('should call createSchemaOnLedger() from service', async () => {
      expect(schemasService.createSchemaOnLedger).toHaveBeenCalled();
    });

    it('should retrieve schema with ID', async () => {
      expect(schemasService.createSchemaOnLedger(createSchema)).toEqual({
        id: schemaDto().schemaID,
      });
    });

    it('should call createSchemas() from service', async () => {
      expect(schemasService.createSchemas).toHaveBeenCalled();
    });

    it('should retrieve created schema', async () => {
      expect(schemasService.createSchemas(createSchema)).toEqual(schemaDto());
    });

    it(`should retrieve HTTP status created(${HttpStatus.CREATED})`, async () => {
      expect(schemasResponse?.statusCode).toEqual(HttpStatus.CREATED);
    });
  });
});
