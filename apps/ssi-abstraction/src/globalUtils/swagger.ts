import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

/**
 * Setup for swagger endpoint documentation
 *
 *
 * @param app - Nest.js internal config object
 */
export default function swaggerSetup(app: INestApplication): void {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Gaia-x SSI Abstraction service')
    .setDescription('API documentation for GAIA-X SSI Abstraction service')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('/swagger', app, document);
}
