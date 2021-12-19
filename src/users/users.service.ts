import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from './dto/signup.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository) private userRepository: UsersRepository,
  ) {}

  async createUser(signupDto: SignupDto) {
    return this.userRepository.createUser(signupDto);
  }

  async getUserByUsername(username: string) {
    const maybeUser = await this.userRepository.getUserByUsername(username);

    if (!maybeUser) {
      throw new NotFoundException();
    }

    return maybeUser;
  }
}
