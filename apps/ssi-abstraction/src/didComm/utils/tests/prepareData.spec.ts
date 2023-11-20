import { prepareInputData, prepareOutputData } from '../prepareData';

describe('prepare data for signing', () => {
  let data: any | any[];

  it('should return buffer from base64', async () => {
    data = [
      {
        type: 'buffer',
        dataBase64: 'YXNkMTIz',
      },
      {
        type: 'buffer',
        dataBase64: 'cXdlcnR5',
      },
    ];

    const actual = prepareInputData(data);

    const expected = [
      Buffer.from(data[0].dataBase64),
      Buffer.from(data[1].dataBase64),
    ];

    expect(expected[0]).toEqual(actual[0]);

    expect(actual.length).toEqual(2);
  });

  it('should return empty array', async () => {
    data = undefined;
    const actual = prepareInputData(data);
    expect(actual.length).toEqual(0);
  });

  it('should return unchanged', async () => {
    data = [1];
    const expected = prepareInputData(data);
    expect(expected[0]).toEqual(data[0]);
  });

  it('should return original object', async () => {
    data = [
      {
        type: 'notbuffer',
        dataBase64: 'YXNkMTIz',
      },
    ];
    const expected = prepareInputData(data);
    expect(expected[0]).toEqual(data[0]);
  });
});

describe('prepare data for returning', () => {
  let data: any;

  it('should return base64 from buffer', async () => {
    data = Buffer.from('asd123');

    const expected = prepareOutputData(data);

    expect(expected).toEqual('YXNkMTIz');
  });

  it('should return unchanged', async () => {
    data = 'asd123';

    const expected = prepareOutputData(data);

    expect(expected).toEqual('asd123');
  });
});
