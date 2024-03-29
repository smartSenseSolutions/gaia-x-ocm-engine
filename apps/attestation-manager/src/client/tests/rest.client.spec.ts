import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import HttpServiceMock from '@src/tests/__mocks__/http-service';
import RestClientService from '../rest.client';

describe('RestClientService', () => {
  let restClient: RestClientService;

  const HttpServiceProvider = {
    provide: HttpService,
    useFactory: HttpServiceMock,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [RestClientService, HttpServiceProvider],
    }).compile();

    restClient = module.get<RestClientService>(RestClientService);
  });

  it('should be defined', () => {
    expect(restClient).toBeDefined();
  });

  describe('post()', () => {
    let restClientResponse: any;

    beforeEach(async () => {
      restClientResponse = await restClient.post('test_url', {});
    });

    it('should call post() from HttpService', async () => {
      expect(HttpServiceMock().post).toHaveBeenCalled();
    });

    it('should retrieve response', async () => {
      expect(restClientResponse).not.toBe(null);
    });
  });
});
