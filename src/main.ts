import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { main } from './aws-config/dynamoDBClient';

import {config} from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('Table name: ', process.env.TABLE_NAME)
  console.log('Endpoint url: ', process.env.ENDPOINT_URL)
  
  await main()
  await app.listen(3000);
}
bootstrap();
