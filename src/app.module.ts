import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { DynamooseModule } from 'nestjs-dynamoose';
import * as dynamoose from 'dynamoose';

@Module({
  imports: [
    DynamooseModule.forRoot({
      logger: true,
    }),
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    const ddb = new dynamoose.aws.ddb.DynamoDB({
      credentials: {
        accessKeyId: 'test',
        secretAccessKey: 'test',
      },
      region: 'local',
      endpoint: process.env.ENDPOINT_URL,
    });
    dynamoose.aws.ddb.set(ddb);
  }
}
