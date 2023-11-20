import { PolicyReturnType } from '@src/client/tsa.client';
import { TSAService } from '@src/common/constants';

const TSAClientServiceMock = jest.fn().mockReturnValue({
  getPolicy: jest.fn().mockImplementation((url: string) => {
    if (url.includes(TSAService.PRINCIPAL_CREDENTIAL_REQUEST)) {
      return {
        success: true,
        returnData: true,
      } as PolicyReturnType;
    }

    return {};
  }),
});

export default TSAClientServiceMock;
