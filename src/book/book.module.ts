import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { DynamooseModule } from 'nestjs-dynamoose';
import { BookSchema } from './entities/book.schema';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: 'Book',
        schema: BookSchema,
        options: {
          create: process.env.NODE_ENV === 'dev',
          tableName: process.env.TABLE_NAME
        },
        
      },
    ]),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
