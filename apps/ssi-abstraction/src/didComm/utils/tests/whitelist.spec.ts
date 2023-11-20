import { checkAll } from '../whitelist';

describe('Whitelist', () => {
  let property: string;
  let method: string;
  let body: {
    subMethod?: {
      name?: string;
      subMethodData?: any[] | any;
    };
    data?: any[] | any;
  };

  it('should return all error messages and success false', async () => {
    property = 'propertyName';
    method = 'methodName';
    body = {
      subMethod: {
        name: 'toUrl',
        subMethodData: [
          {
            domain: 'localhost',
          },
        ],
      },
      data: [],
    };

    const res = checkAll(property, method, body);

    expect(res).toEqual({
      success: false,
      messages: [
        '"property" either does not exist or is not allowed.',
        '"method" either does not exist or is not allowed.',
        '"subMethod name" either does not exist or is not allowed.',
      ],
    });
  });

  it('should return no messages and success true', async () => {
    property = 'connections';
    method = 'createConnection';
    body = {};

    const res = checkAll(property, method, body);

    expect(res).toEqual({
      success: true,
      messages: [],
    });
  });
});
