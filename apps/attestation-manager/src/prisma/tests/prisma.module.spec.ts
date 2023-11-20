import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import PrismaModule from '../prisma.module';
import PrismaService from '../prisma.service';
import PrismaServiceMock from './__mocks__/prisma.service';

describe('PrismaModule', () => {
  let prismaModule: PrismaModule;

  const PrismaServiceProvider = {
    provide: PrismaService,
    useFactory: PrismaServiceMock,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [PrismaModule, PrismaServiceProvider],
      exports: [PrismaService],
    }).compile();

    prismaModule = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(prismaModule).toBeDefined();
  });
});
