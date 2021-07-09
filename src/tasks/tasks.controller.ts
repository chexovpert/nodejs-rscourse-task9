import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  HttpStatus,
  UseGuards,
  HttpException,
  UseFilters,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HttpExceptionFilter } from 'src/helpers/http-exception.filter';

@UseGuards(JwtAuthGuard)
@UseFilters(new HttpExceptionFilter())
@Controller('boards/:boardId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(
    @Param('boardId') boardId: string | undefined,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(boardId, createTaskDto);
  }

  @Get()
  findAllByBoardID(@Param('boardId') boardId: string | undefined) {
    return this.tasksService.findAllByBoardID(boardId);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':taskId')
  async findOne(
    @Param('boardId') boardId: string | undefined,
    @Param('taskId') taskId: string | undefined,
  ) {
    try {
      const task = await this.tasksService.findOne(boardId, taskId);
      if (task !== undefined) {
        return task;
      } else {
        throw 'not found';
      }
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':taskId')
  async update(
    @Param('boardId') boardId: string | undefined,
    @Param('taskId') taskId: string | undefined,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    try {
      const task = await this.tasksService.update(
        boardId,
        taskId,
        updateTaskDto,
      );
      if (task === undefined) {
        throw 'not found';
      } else {
        return task;
      }
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':taskId')
  async remove(
    @Param('boardId') boardId: string | undefined,
    @Param('taskId') taskId: string | undefined,
  ) {
    try {
      const bool = await this.tasksService.remove(boardId, taskId);
      if (bool) {
        return bool;
      } else {
        throw 'not found';
      }
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }
}
