import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { Task } from 'src/tasks/entities/task.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}
  async create(createBoardDto: CreateBoardDto): Promise<Board | undefined> {
    const newBoard = this.boardRepository.create(createBoardDto);
    const savedBoard = await this.boardRepository.save(newBoard);
    const savedId = savedBoard.id;
    if (savedId) return this.boardRepository.findOne(savedId);
    return undefined;
  }

  findAll(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  findOne(boardId: string | undefined): Promise<Board> {
    return this.boardRepository.findOne(boardId);
    //return `This action returns a #${id} board`;
  }

  async update(
    boardId: string | undefined,
    updateBoardDto: UpdateBoardDto,
  ): Promise<Board | undefined> {
    const res = await this.boardRepository.findOne(boardId);
    if (res === undefined || boardId === undefined) return undefined;
    const updatedBoard = await this.boardRepository.update(boardId, updateBoardDto);
    return updatedBoard.raw;
    //return `This action updates a #${id} board`;
  }

  async remove(boardId: string): Promise<boolean> {
    const res = this.boardRepository.findOne(boardId);
    if (res === undefined || boardId === undefined) return false;

    const deletedTask = await this.taskRepository.find({ where: { boardId: boardId } });
    Promise.all(
      deletedTask.map(async (task: Task) => {
        //console.log(task);
        await this.taskRepository.delete({ id: task.id });
      })
    );
    const deletedBoard = await this.boardRepository.delete(boardId);
    return !!deletedBoard.affected
  }
}
