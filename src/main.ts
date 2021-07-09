import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';
import * as yaml from 'yamljs';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  let app: INestApplication | NestFastifyApplication | null = null;
  if (process.env.USE_FASTIFY === 'false') {
    app = await NestFactory.create(AppModule);
  } else {
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );
  }
  const swaggerDocument = yaml.load(join(__dirname, '..', 'doc', 'api.yaml'));
  SwaggerModule.setup('doc', app, swaggerDocument);
  await app.listen(PORT, () => console.log(`app started on ${PORT}`));
}
bootstrap();
