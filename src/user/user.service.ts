import { Injectable } from '@nestjs/common';
import { InjectModel, Model } from 'nestjs-dynamoose';
import { User, UserKey } from './entities/user.interface';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import { ConfigService } from '@nestjs/config';
import { SignUpUserDto } from './dto/user-sign-up.to';
import { SignInUserDto } from './dto/user-sign-in.dto';
import { VerifyUserDto } from './dto/verify-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User, UserKey>,
    private userPool: CognitoUserPool,
    private config: ConfigService,
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: 'fdsafdasfdsa',
      ClientId: '3fdsafdsasfd21',
    });
  }
  async signUp(body: SignUpUserDto) {
    const { email, password } = body;
    return new Promise((resolve, reject) => {
      return this.userPool.signUp(
        email,
        password,
        [new CognitoUserAttribute({ Name: 'email', Value: email })],
        null,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        },
      );
    });
  }

  async verify(body: VerifyUserDto) {
    const { email, verificationCode } = body;
    return new Promise((resolve, reject) => {
      return new CognitoUser({
        Username: email,
        Pool: this.userPool,
      }).confirmRegistration(verificationCode, true, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async signIn(body: SignInUserDto) {
    const { email, password } = body;

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const newUser = new CognitoUser(userData);

    return new Promise<CognitoUserSession>((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }
}