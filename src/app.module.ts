import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
//import typeormconfig from "./common/ormconfig"
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import {typeormconfig} from './common/ormconfig';
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
  providers: [AppService],
})
export class AppModule {}
