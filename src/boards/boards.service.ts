import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>
  ) {}
  async create(createBoardDto: CreateBoardDto): Promise<Board| undefined> {
    const newBoard = this.boardRepository.create(createBoardDto);
    const savedBoard = await this.boardRepository.save(newBoard);
    const savedId = savedBoard.id;
    if (savedId) return this.boardRepository.findOne(savedId)
    return undefined;
  }

  findAll(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  findOne(id: string | undefined) : Promise<Board> {
    return this.boardRepository.findOne(id)
    //return `This action returns a #${id} board`;
  }

  async update(id: string | undefined, updateBoardDto: UpdateBoardDto): Promise<Board | undefined> {
    const res = await this.boardRepository.findOne(id);
    if (res === undefined || id === undefined) return undefined;
    const updatedBoard = await this.boardRepository.update(id, updateBoardDto);
    return updatedBoard.raw;
    //return `This action updates a #${id} board`;
  }

  async remove(id: string | undefined): Promise<'deleted'| 'not found'> {
    const res = await this.boardRepository.findOne(id);
    if (res === undefined || id === undefined) return 'not found';
    const deletedBoard = await this.boardRepository.delete(id);
    if (deletedBoard.affected) return 'deleted';
    return 'not found';
    //return `This action removes a #${id} board`;
  }
}
