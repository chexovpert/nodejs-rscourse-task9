import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  //HttpStatus,
} from '@nestjs/common';
import {
  Request,
  //Response,
} from 'express';
import { FastifyReply, FastifyRequest } from 'fastify';
import { appendFile } from 'fs';
//import { ServerResponse } from 'http';
const errorLogsPath = './logs/errorlogs.txt';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger('HTTP');
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    //const response = ctx.getResponse<Response>(); ?
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const status = exception.getStatus();
    const message = exception.message;
    //const { statusCode } = response;
    //console.log(statusCode);

    const { body, params, method, url } = request;
    const data =
      `\nError \nMethod: ${method} \nUrl: ${url} \nStatus Code:${status} \nMessage: ${message} \nParams:` +
      JSON.stringify(params) +
      '\nBody:' +
      JSON.stringify(body) +
      '\n';
    //console.log(status);
    appendFile(errorLogsPath, data, function (error) {
      if (error) throw error;
    });
    this.logger.error(data);

    response.status(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
