import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpUserDto } from './dto/user-sign-up.to';
import { SignInUserDto } from './dto/user-sign-in.dto';
import { VerifyUserDto } from './dto/verify-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  signUp(@Body() body: SignUpUserDto) {
    return this.userService.signUp(body);
  }

  @Post('verify')
  verify(@Body() body: VerifyUserDto) {
    return this.userService.verify(body);
  }

  @Post('sign-in')
  signIn(@Body() body: SignInUserDto) {
    return this.userService.signIn(body);
  }
}
