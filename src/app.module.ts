import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { DynamooseModule } from 'nestjs-dynamoose';
import * as dynamoose from 'dynamoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    DynamooseModule.forRoot({
      logger: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BookModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(config: ConfigService) {
    const ddb = new dynamoose.aws.ddb.DynamoDB({
      credentials: {
        accessKeyId: config.getOrThrow('AWS_ACCESS_KEY_ID'),
        secretAccessKey: config.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      },
      region: config.getOrThrow('AWS_REGION'),
      endpoint: config.getOrThrow('ENDPOINT'),
    });
    dynamoose.aws.ddb.set(ddb);
  }
}
