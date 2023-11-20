import PrismaService from '@src/prisma/prisma.service';
import { APP_FILTER } from '@nestjs/core';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import validationSchema from '@config/validation';

import config from '@config/config';
import HealthController from '@health/health.controller';
import ExceptionHandler from '@common/exception.handler';
import ConnectionsModule from '@connections/module';
import { ScheduleModule } from '@nestjs/schedule';
import SchedulerService from './connections/scheduler/scheduler.service';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TerminusModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validationSchema,
    }),
    ConnectionsModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionHandler,
    },
    SchedulerService,
    PrismaService,
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
