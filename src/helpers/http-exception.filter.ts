import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core'
import { Request, Response } from 'express';
import { FastifyReply } from 'fastify';
//import { ServerResponse } from 'http';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    //const response = ctx.getResponse<Response>(); ?
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
