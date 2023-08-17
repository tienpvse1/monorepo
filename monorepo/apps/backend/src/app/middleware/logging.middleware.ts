import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { getIp } from 'src/util/ip';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('Request');
  use(req: any, _res: Response, next: () => void) {
    this.logger.log(
      `[${req.method.toUpperCase()}] - ${req.url} from IP: ${getIp(req.ip)}`,
    );
    next();
  }
}
