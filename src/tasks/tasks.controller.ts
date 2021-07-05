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
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('boards/:boardId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
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
  findOne(
    @Param('boardId') boardId: string | undefined,
    @Param('taskId') taskId: string | undefined,
  ) {
    return this.tasksService.findOne(boardId, taskId);
  }

  @Put(':taskId')
  update(
    @Param('boardId') boardId: string | undefined,
    @Param('taskId') taskId: string | undefined,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(boardId, taskId, updateTaskDto);
  }

  @Delete(':taskId')
  remove(
    //@Res({ passthrough: true }) res: Response,
    @Param('boardId') boardId: string | undefined,
    @Param('taskId') taskId: string | undefined,
  ) {
    return this.tasksService.remove(boardId, taskId);
    //res.status;
  }
}
