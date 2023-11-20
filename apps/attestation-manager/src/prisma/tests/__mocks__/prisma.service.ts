import schemaDto from '@schemas/tests/stubs/schema-dto';
import credDefStub from '@src/credentialDef/tests/stubs/credDef.stub';
import credentialDto from '@src/issue-credential/tests/stubs/credential-dto';
import credentialTypeDto from '@src/issue-credential/tests/stubs/credential-type-dto';

const PrismaServiceMock = jest.fn().mockReturnValue({
  $transaction: jest.fn().mockImplementation((args: any) => [...args]),
  schema: {
    create: jest.fn().mockReturnValue([schemaDto()]),
    update: jest.fn().mockReturnValue([schemaDto()]),
    count: jest.fn().mockReturnValue(1),
    findMany: jest.fn().mockReturnValue([schemaDto()]),
  },
  credentialDef: {
    create: jest.fn().mockReturnValue([credDefStub()]),
    update: jest.fn().mockReturnValue([credDefStub()]),
    count: jest.fn().mockReturnValue(1),
    findMany: jest.fn().mockReturnValue([credDefStub()]),
    findFirst: jest.fn().mockReturnValue(credDefStub()),
  },
  credential: {
    create: jest.fn().mockReturnValue(credentialDto()),
    update: jest.fn().mockReturnValue(credentialDto()),
    findUnique: jest.fn().mockReturnValue(credentialDto()),
    count: jest.fn().mockReturnValue(1),
    findMany: jest.fn().mockReturnValue([credentialDto()]),
  },
  credentialsType: {
    update: jest.fn().mockReturnValue(credentialTypeDto()),
    create: jest.fn().mockReturnValue(credentialTypeDto()),
    findUnique: jest.fn().mockReturnValue(credentialTypeDto()),
  },
});

export default PrismaServiceMock;
