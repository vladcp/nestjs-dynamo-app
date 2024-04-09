import { IsString } from 'class-validator';

export class VerifyUserDto {
  @IsString()
  email: string;

  @IsString()
  verificationCode: string;
}
