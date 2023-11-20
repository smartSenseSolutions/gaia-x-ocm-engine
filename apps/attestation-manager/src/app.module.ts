import { APP_FILTER } from '@nestjs/core';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import config from '@config/config';
import validationSchema from '@config/validation';
import HealthController from '@src/health/health.controller';
import ExceptionHandler from '@src/common/exception.handler';
import SchemasModule from '@src/schemas/module';
import CredentialDefModule from '@src/credentialDef/module';
import UserInfoModule from '@userInfo/module';
import AttestationModule from './issue-credential/module';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [
    TerminusModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validationSchema,
    }),
    SchemasModule,
    AttestationModule,
    CredentialDefModule,
    UserInfoModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionHandler,
    },
  ],
})
export default class AppModule implements NestModule {
  // eslint-disable-next-line class-methods-use-this
  configure(consumer: MiddlewareConsumer) {
    // eslint-disable-line
    consumer
      .apply(AuthMiddleware)
      .exclude({
        path: 'v1/health',
        method: RequestMethod.GET,
      })
      .forRoutes('*');
  }
}
