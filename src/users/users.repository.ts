import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { EntityRepository, Repository } from 'typeorm';
import { SignupDto } from './dto/signup.dto';
import { User } from './users.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser({ username, password, fullName }: SignupDto): Promise<User> {
    const hashedPassword = await this.getHashedPassword(password);

    try {
      const user = this.create({
        username,
        password: hashedPassword,
        fullName,
      });

      await this.save(user);

      return user;
    } catch (error) {
      throw new BadRequestException('User with this username already exists');
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.findOne({ username });
  }

  private async getHashedPassword(passwordToHash: string): Promise<string> {
    const salt = await bcrypt.genSalt();

    return bcrypt.hash(passwordToHash, salt);
  }
}
