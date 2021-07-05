import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Task } from 'src/tasks/entities/task.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Task])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
