import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { appendFile, appendFileSync } from 'fs';
import { FastifyReply } from 'fastify';
import {
  Request,
  //Response,
} from 'express';
const requestLogsPath = './logs/requestlogs.txt';
//const errorLogsPath = './logs/errorlogs.txt'
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger('HTTP');
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();

    //context.switchToHttp().
    const { body, params, method, url } = request;
    // const status = context.switchToHttp().getResponse;
    // const message = exception.message;

    //const errorCode = (statusCode).toString().split('')[0];

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        //console.log(response.raw.statusMessage);
        //console.log(response.raw.statusCode);
        // setTimeout(() => {
        //     console.log(context.switchToHttp().getResponse().statusCode)
        //   }, 0);
        const { statusCode } = response;
        console.log(statusCode);

        const data =
          `\nRequest \nMethod: ${method} \nUrl: ${url} \nParams:` +
          JSON.stringify(params) +
          '\nBody:' +
          JSON.stringify(body) +
          '\n';

        this.logger.log(`${data}`);
        appendFile(requestLogsPath, data, function (error) {
          if (error) throw error;
        });
      }),
    );
  }
}
