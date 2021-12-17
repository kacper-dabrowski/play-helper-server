import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AddSolutionDto, UpdateSolutionDto } from './dto/solutions.dto';
import { Solution } from './solution.entity';
import { SolutionsService } from './solutions.service';

@Controller('solutions')
export class SolutionsController {
  constructor(private solutionsService: SolutionsService) {}

  @Get()
  getAllSolutions(): Promise<Solution[]> {
    return this.solutionsService.getAllSolutions();
  }
  @Post()
  addSolution(@Body() addSolutionDto: AddSolutionDto) {
    return this.solutionsService.addSolution(addSolutionDto);
  }

  @Put(':id')
  updateSolutionById(
    @Body() updateSolutionDto: UpdateSolutionDto,
    @Param('id') solutionId: string,
  ) {
    return this.solutionsService.updateSolution(updateSolutionDto, solutionId);
  }

  @Delete(':id')
  removeSolutionById(@Param('id') solutionId: string) {
    return this.solutionsService.removeSolutionById(solutionId);
  }
}
