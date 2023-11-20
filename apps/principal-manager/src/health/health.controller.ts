import { Controller, Get, Version, HttpStatus } from '@nestjs/common';

import ResponseType from '@common/response';

@Controller('health')
export default class HealthController {
  res: ResponseType;

  @Version(['1'])
  @Get()
  getHealth() {
    this.res = {
      statusCode: HttpStatus.OK,
      message: `${new Date()}`,
    };
    return this.res;
  }
}
