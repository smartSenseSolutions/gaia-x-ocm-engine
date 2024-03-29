import * as fs from 'fs';

describe('Logger', () => {
  it('should create a directory if not exists', async () => {
    jest.spyOn(fs, 'existsSync').mockImplementation(() => false);
    jest.spyOn(fs, 'mkdirSync').mockImplementation(() => 'mocked');
    const logger = await import('./logger');
    expect(logger).toBeDefined();
    expect(fs.existsSync).toHaveBeenCalled();
    expect(fs.mkdirSync).toHaveBeenCalled();
  });
});
