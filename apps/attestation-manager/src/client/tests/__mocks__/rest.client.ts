import schemaAgentDto from '@src/schemas/tests/stubs/schema-from-agent-dto';

const RestClientServiceMock = jest.fn().mockReturnValue({
  post: jest.fn().mockReturnValue({ agent: 'response' }),
  get: jest.fn().mockImplementation((url: string) => {
    if (url.includes('schemas')) {
      return schemaAgentDto;
    }

    return {};
  }),
});

export default RestClientServiceMock;
