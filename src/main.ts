import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  let app: INestApplication | NestFastifyApplication | null= null
  if(process.env.USE_FASTIFY === 'false'){
    app = await NestFactory.create(AppModule);
  } else {
    app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
    );
  }
  await app.listen(PORT, () => console.log(`app started on ${PORT}`));
}
bootstrap();
