import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  
  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    return await this.bookService.create(createBookDto);
  }

  @Get()
  async findAll() {
    return await this.bookService.findAll();
  }

  @Get(':bookId')
  async findOne(@Param('bookId') bookId: string) {
    return await this.bookService.findOne(bookId);
  }

  @Patch(':bookId')
  async update(@Param('bookId') bookId: string, @Body() updateBookDto: UpdateBookDto) {
    return await this.bookService.update(bookId, updateBookDto);
  }

  @Delete(':bookId')
  async remove(@Param('bookId') bookId: string) {
    return await this.bookService.remove(bookId);
  }
  // for testing, I guess
  @Post('createTable')
  async createTable(@Body() b){
    return await this.bookService.createTable()
  }
}
