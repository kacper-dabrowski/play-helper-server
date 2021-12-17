import { Optional } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';

export class AddSupportRequestDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  content: string;
  @IsNotEmpty()
  department: string;
}

export class UpdateSupportRequestDto {
  @Optional()
  title: string;
  @Optional()
  description: string;
  @Optional()
  content: string;
  @Optional()
  department: string;
}
