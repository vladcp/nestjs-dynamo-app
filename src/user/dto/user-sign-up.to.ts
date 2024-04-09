import { IsNumber, IsString } from 'class-validator';

export class SignUpUserDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsNumber()
  age: number;
}
