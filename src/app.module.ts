import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { Board } from './boards/entities/board.entity';
import { Task } from './tasks/entities/task.entity';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    BoardsModule,
    TasksModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Board, Task],
      synchronize: true,
    }),
    AuthModule
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
