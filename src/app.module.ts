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
      table: {
        create: process.env.NODE_ENV === 'dev',
        waitForActive: process.env.NODE_ENV === 'dev'
      }
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
    if (process.env.NODE_ENV === 'dev') {
      const dynamooseConfig = {
        credentials: {
          accessKeyId: config.getOrThrow('AWS_ACCESS_KEY_ID'),
          secretAccessKey: config.getOrThrow('AWS_SECRET_ACCESS_KEY'),
        },
        region: config.getOrThrow('AWS_REGION'),
      } 
      const ddb = new dynamoose.aws.ddb.DynamoDB(dynamooseConfig)
      dynamoose.aws.ddb.set(ddb);
      dynamoose.aws.ddb.local(config.get('ENDPOINT_URL'))
    }
    
  }
}
