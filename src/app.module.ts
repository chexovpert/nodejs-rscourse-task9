import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { typeormconfig } from './common/ormconfig';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerMiddleware } from './helpers/logging.interceptor';
import { LoggingInterceptor } from './helpers/logger.interceptor2';
//import { LoggingInterceptor } from './helpers/logging.interceptor';
@Module({
  imports: [
    UsersModule,
    BoardsModule,
    TasksModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      //isGlobal: true
    }),
    TypeOrmModule.forRoot(typeormconfig),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer): void {
  //   consumer.apply(LoggerMiddleware).forRoutes('*');
  // }
}
