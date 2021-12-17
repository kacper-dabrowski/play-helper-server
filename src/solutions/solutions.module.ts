import { Module } from '@nestjs/common';
import { SolutionsService } from './solutions.service';
import { SolutionsController } from './solutions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolutionsRepository } from './solutions.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SolutionsRepository])],
  providers: [SolutionsService],
  controllers: [SolutionsController],
})
export class SolutionsModule {}
