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
import { Response } from 'express';

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
  async findOne(
    @Res() res: Response,
    @Param('boardId') boardId: string | undefined,
    @Param('taskId') taskId: string | undefined,
  ) {
    const task = await this.tasksService.findOne(boardId, taskId);
    if(task !== undefined){
      res.status(200).send(task)}
     else {
      res.status(404).send('not found')};
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
  async remove(
    @Res() res: Response,
    @Param('boardId') boardId: string | undefined,
    @Param('taskId') taskId: string | undefined,
  ) {
    const bool = this.tasksService.remove(boardId, taskId);
    if(bool){
    res.status(204).send('succesfuly deleted')}
   else {
    res.status(404).send('not found')};
  }
}
