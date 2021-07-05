import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':boardId')
  findOne(@Param('boardId') boardId: string) {
    return this.boardsService.findOne(boardId);
  }

  @Put(':boardId')
  update(@Param('boardId') boardId: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.update(boardId, updateBoardDto);
  }

  @Delete(':boardId')
  remove(@Param('boardId') boardId: string) {
    return this.boardsService.remove(boardId);
  }
}
