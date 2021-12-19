import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SignupDto } from '../users/dto/signup.dto';
import { User } from '../users/users.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private userService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  login(@Request() request) {
    return request.user;
  }

  @Post('/sign-up')
  register(@Body() signupDto: SignupDto): Promise<User> {
    return this.userService.registerUser(signupDto);
  }
}
