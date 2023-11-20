import { existsSync, mkdirSync } from 'fs';
import { Logger } from 'winston';
import ecsFormat from '@elastic/ecs-winston-format';
// import { ElasticsearchTransport } from 'winston-elasticsearch';
import winston = require('winston');
import { LoggerConfig } from '@common/constants';

if (!existsSync(LoggerConfig.lOG_DIR)) {
  mkdirSync(LoggerConfig.lOG_DIR);
}

// const esTransportOpts = {
//   clientOpts: { node: process.env.ECSURL },
// };

// const esTransportOpts = {
//   clientOpts: { node: 'http://localhost:9200' },
// };

// const esTransport = new ElasticsearchTransport(esTransportOpts);

// esTransport.on('error', (error: any) => {
//   console.error('Error in logger caught', error);
// });

const logger: Logger = winston.createLogger({
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  format: ecsFormat({ convertReqRes: true }),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: LoggerConfig.FILE_PATH,
    }),
    // esTransport,
  ],
});

logger.on('error', (error) => {
  console.error('Error in logger caught', error);
});

export default logger;
