import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
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
  async findOne(@Res() res: Response, @Param('boardId') boardId: string) {
    const board = await this.boardsService.findOne(boardId);
    if(board !== undefined){
      res.status(200).send(board)}
     else {
      res.status(404).send('not found')};
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
