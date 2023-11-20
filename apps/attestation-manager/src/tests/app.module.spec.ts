import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import AppModule from '@src/app.module';

// import config from '@config/config';

// jest.mock('@config/config', jest.fn().mockReturnValue({
//   PORT: 3005,
//   ACCEPT_MEMBERSHIP_CREDENTIALS_CONFIG: process.env.ACCEPT_MEMBERSHIP_CREDENTIALS_CONFIG,
// }));

describe('App Module', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should work', () => {
    expect(true).toBe(true);
  });
});
