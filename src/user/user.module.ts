import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DynamooseModule } from 'nestjs-dynamoose';
import { UserSchema } from './entities/user.schema';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

@Module({
  imports: [
    DynamooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
        options: {
          tableName: 'user',
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, CognitoUserPool],
})
export class UserModule {}
