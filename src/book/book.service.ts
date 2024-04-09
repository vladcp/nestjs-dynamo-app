import { Injectable } from '@nestjs/common';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { Book, BookKey } from './entities/book.interface';
import { CreateBookDto } from './dto/create-book.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BookService {
  constructor(
    @InjectModel('Book')
    private bookModel: Model<Book, BookKey>,
  ) {}

  create(book: CreateBookDto) {
    return this.bookModel.create({
      ...book,
      id: uuid(),
    });
  }

  update(key: BookKey, book: UpdateBookDto) {
    return this.bookModel.update(key, book);
  }

  findOne(key: BookKey) {
    return this.bookModel.get(key);
  }

  findAll() {
    return this.bookModel.scan().exec();
  }

  remove(key: BookKey) {
    return this.bookModel.delete(key);
  }
}
