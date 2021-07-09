import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
//import { TasksModule } from 'src/tasks/tasks.module';
import { Task } from 'src/tasks/entities/task.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TasksService } from 'src/tasks/tasks.service';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), TasksModule, AuthModule],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
