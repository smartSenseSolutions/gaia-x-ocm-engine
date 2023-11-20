import { Logger } from 'winston';
import ecsFormat from '@elastic/ecs-winston-format';
// import { ElasticsearchTransport } from 'winston-elasticsearch';
import winston = require('winston');

// const esTransportOpts = {
//   clientOpts: { node: process.env.ECSURL },
// };
//
// const esTransport = new ElasticsearchTransport(esTransportOpts);
//
// esTransport.on('error', (error: any) => {
//   console.error('Error in logger caught', error);
// });

const logger: Logger = winston.createLogger({
  format: ecsFormat({ convertReqRes: true }),
  transports: [
    new winston.transports.Console(),
    // esTransport,
  ],
});

logger.on('error', (error) => {
  console.error('Error in logger caught', error);
});

export default logger;
