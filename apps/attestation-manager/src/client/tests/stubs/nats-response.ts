import { ResponseType } from '@src/common/response';
import AttestationService from '@src/issue-credential/services/service';

const natsAgentResponse: ResponseType = {
  statusCode: 200,
  data: {
    service_endpoint: 'TEST_AGENT_URL',
  },
  message: 'Agent Details',
};

const natsConnectionResponse = {
  status: AttestationService.connectionStatus.TRUSTED,
};

export { natsAgentResponse, natsConnectionResponse };
