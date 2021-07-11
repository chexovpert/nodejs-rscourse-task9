import { Request, Response, NextFunction } from 'express';
import {
  Injectable,
  NestMiddleware,
  Logger,
  ExecutionContext,
} from '@nestjs/common';
import { appendFile, appendFileSync } from 'fs';
import { finished } from 'stream';
const requestLogsPath = './logs/requestlogs.txt';
const errorLogsPath = './logs/errorlogs.txt';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const { ip, method, url } = req;
    //console.log(req);
    finished(res, () => {
      const { statusCode, statusMessage } = res;
      const { body, params } = req;
      //console.log(statusMessage);

      //const contentLength = res.get('content-length');
      const errorCode = statusCode.toString().split('')[0];
      const data =
        `\nMethod: ${method} \nUrl: ${url} \nStatus Code:${statusCode} \nStatus Message: ${statusMessage} \nParams:` +
        JSON.stringify(params) +
        '\nBody:' +
        JSON.stringify(body) +
        '\n';
      if (errorCode === '4' || errorCode === '5') {
        this.logger.error(`${data}`);
        appendFile(errorLogsPath, data, function (error) {
          if (error) throw error;
        });
      } else {
        this.logger.log(`${data}`);
        appendFile(requestLogsPath, data, function (error) {
          if (error) throw error;
        });
      }
    });
    // this.logger.log(
    //   `${method} ${url}  -  ${ip}`
    // );
    // this.logger.error('something went wrong!');
    next();
  }
}
