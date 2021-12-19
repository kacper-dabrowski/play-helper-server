import { Injectable } from '@nestjs/common';
import { LoginDto } from '../users/dto/login.dto';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import bcrypt from 'bcryptjs';
import { SignupDto } from '../users/dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async registerUser(signupDto: SignupDto) {
    return this.userService.createUser(signupDto);
  }

  async validateUser(loginDto: LoginDto): Promise<User | undefined> {
    const user = await this.userService.getUserByUsername(loginDto.username);

    const passwordMatch = this.comparePasswords(
      loginDto.password,
      user.password,
    );

    if (!passwordMatch) {
      return undefined;
    }

    return user;
  }

  private async comparePasswords(
    enteredPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(enteredPassword, hashedPassword);
  }
}
