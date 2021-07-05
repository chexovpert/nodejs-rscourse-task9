import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>
  ){}
  async create(boardId:string | undefined, createTaskDto: CreateTaskDto) : Promise<Task | undefined> {
    const createdTask = {...createTaskDto, boardId}
    const newTask = this.taskRepository.create(createdTask)
    const savedTask = await this.taskRepository.save(newTask);
    const savedId = savedTask.id
    if (savedId) return this.taskRepository.findOne(savedId)
    return undefined
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  findAllByBoardID(boardId : string | undefined): Promise<Task[]> {
    return this.taskRepository.find({where: {boardId: `${boardId}`}});
  }

  findOne( boardId: string | undefined, taskId: string | undefined): Promise<Task| undefined> {
    if (boardId === undefined || taskId === undefined) return undefined
    return this.taskRepository.findOne({where: {boardId: boardId, id: taskId}})
  }

  async update(boardId: string | undefined, taskId: string | undefined, updateTaskDto: UpdateTaskDto) : Promise<Task| undefined> {
    const res = await this.taskRepository.findOne({where:{ boardId : boardId, id: taskId}})
    if (res === undefined || boardId === undefined || taskId === undefined) return undefined
    const updatedTask = await this.taskRepository.update({ boardId : boardId, id: taskId}, updateTaskDto)
    return updatedTask.raw
  }

  remove(id: string) {
    return `This action removes a #${id} task`;
  }
}
