import { Optional } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';

export class AddSolutionDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  content: string;
  @Optional()
  isPublic: boolean;
}

export class UpdateSolutionDto {
  @Optional()
  title: string;
  @Optional()
  description: string;
  @Optional()
  content: string;
  @Optional()
  isPublic: boolean;
}
