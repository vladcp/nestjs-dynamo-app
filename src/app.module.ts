import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { DynamooseModule } from 'nestjs-dynamoose';
import * as dynamoose from 'dynamoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DynamooseModule.forRoot({
      logger: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(config: ConfigService) {
    const ddb = new dynamoose.aws.ddb.DynamoDB({
      credentials: {
        accessKeyId: config.getOrThrow('ACCESS_KEY_ID'),
        secretAccessKey: config.getOrThrow('SECRET_ACCESS_KEY'),
      },
      region: config.getOrThrow('REGION'),
      endpoint: config.getOrThrow('ENDPOINT'),
    });
    dynamoose.aws.ddb.set(ddb);
  }
}
