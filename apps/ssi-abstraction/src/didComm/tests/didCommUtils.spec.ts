import { objectPathLoop } from '../didCommUtils';

describe('loop through objects with methods', () => {
  let response: any;
  let path: string[];
  let context: any;
  let prevContext: any;
  let body: {
    subMethod?: {
      name?: string;
      subMethodData?: any[] | any;
    };
    data?: any[] | any;
  };

  it('should return modified response from executing a method of original response', async () => {
    const expected = {
      method1Res: 'method1Res',
    };

    response = {
      key: 'asd',
      method1: () => expected,
    };
    path = ['method1'];
    context = response[path[0]];
    prevContext = response;
    body = {
      subMethod: {
        name: 'method1',
      },
    };

    const actual = objectPathLoop(response, path, context, prevContext, body);

    expect(actual).toEqual(expected);
  });

  it('should return property when no method is specified', async () => {
    response = {
      key: 'asd',
      key2: 'asd123',
    };
    path = ['key2'];
    context = response[path[0]];
    prevContext = response;
    body = {};

    const expected = 'asd123';

    const actual = objectPathLoop(response, path, context, prevContext, body);

    expect(actual).toEqual(expected);
  });
});
