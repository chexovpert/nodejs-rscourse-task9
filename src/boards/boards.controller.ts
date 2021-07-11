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
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HttpExceptionFilter } from 'src/helpers/http-exception.filter';

@UseGuards(JwtAuthGuard)
@UseFilters(HttpExceptionFilter)
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  async create(@Body() createBoardDto: CreateBoardDto) {
    try {
      return this.boardsService.create(createBoardDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Get()
  findAll() {
    return this.boardsService.findAll();
  }
  @Get(':boardId')
  async findOne(@Res() res: Response, @Param('boardId') boardId: string) {
    try {
      const board = await this.boardsService.findOne(boardId);
      if (board === undefined) {
        throw 'not found';
      } else {
        return res.status(200).send(board);
      }
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }
  @Put(':boardId')
  update(
    @Param('boardId') boardId: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardsService.update(boardId, updateBoardDto);
  }
  @Delete(':boardId')
  async remove(@Param('boardId') boardId: string) {
    try {
      const deleted = await this.boardsService.remove(boardId);
      if (!deleted) throw 'board not found';
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }
}
