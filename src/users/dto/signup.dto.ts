import { IsNotEmpty, Min, MinLength } from 'class-validator';
import { Match } from '../../shared/validation/match.decorator';

export class SignupDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  fullName: string;
  @IsNotEmpty()
  @MinLength(6)
  password: string;
  @IsNotEmpty()
  @Match('password')
  repeatPassword: string;
}
