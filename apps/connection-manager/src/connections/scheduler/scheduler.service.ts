import logger from '@utils/logger';
import {
  Controller,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import PrismaService from '@DB/prisma.service';
import ConnectionRepository from '@connections/repository/connection.repository';
import ConnectionsService from '@connections/services/service';
import ConfigClient from '@src/client/config.client';

@Injectable()
@Controller()
export default class SchedulerService {
  private connectionRepository;

  constructor(private readonly prismaService: PrismaService) {
    this.connectionRepository = new ConnectionRepository(this.prismaService);
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async expireNonCompleteConnection() {
    const compareDateTime = ConfigClient.getConnectionExpire();
    if (compareDateTime) {
      const checkExpireTillDateTime = ConfigClient.checkExpireTill();

      const query = {
        where: {
          AND: [
            {
              OR: [
                {
                  status: ConnectionsService.status.INVITED,
                },
                {
                  status: ConnectionsService.status.REQUESTED,
                },
                {
                  status: ConnectionsService.status.RESPONDED,
                },
              ],
            },
            {
              isActive: true,
            },
            {
              createdDate: {
                lt: compareDateTime,
                ...(checkExpireTillDateTime && { gt: checkExpireTillDateTime }),
              },
            },
          ],
        },
        data: {
          isActive: false,
        },
      };
      const result = await this.connectionRepository.updateManyConnection(
        query,
      );
      logger.info(JSON.stringify(result));
    } else {
      throw new InternalServerErrorException(
        'Connection Expire period is mandatory',
      );
    }
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async expireNonTrustedConnection() {
    const compareDateTime = ConfigClient.getConnectionExpire();
    if (compareDateTime) {
      const checkExpireTillDateTime = ConfigClient.checkExpireTill();

      const query = {
        where: {
          AND: [
            {
              status: ConnectionsService.status.COMPLETE,
            },
            {
              isActive: true,
            },
            {
              createdDate: {
                lt: compareDateTime,
                ...(checkExpireTillDateTime && { gt: checkExpireTillDateTime }),
              },
            },
          ],
        },
        data: {
          isActive: false,
        },
      };
      const result = await this.connectionRepository.updateManyConnection(
        query,
      );
      logger.info(JSON.stringify(result));
    } else {
      throw new InternalServerErrorException(
        'Connection Expire period is mandatory',
      );
    }
  }
}
