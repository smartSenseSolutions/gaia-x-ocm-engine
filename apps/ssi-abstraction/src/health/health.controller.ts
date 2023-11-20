import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ResponseType } from '@common/response';

@Controller('health')
export class HealthController {
  /**
   * Check if app is running
   *
   * @returns - OK (200) if app is running
   */
  // eslint-disable-next-line class-methods-use-this
  @Get()
  getHealth() {
    return {
      statusCode: HttpStatus.OK,
      message: `${new Date()}`,
    } as ResponseType;
  }
}

export default HealthController;
