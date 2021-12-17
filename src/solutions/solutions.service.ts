import { Injectable } from '@nestjs/common';
import { AddSolutionDto, UpdateSolutionDto } from './dto/solutions.dto';
import { SolutionsRepository } from './solutions.repository';

@Injectable()
export class SolutionsService {
  constructor(private solutionsRepository: SolutionsRepository) {}
  getAllSolutions() {
    return this.solutionsRepository.getAllSolutions();
  }

  addSolution(addSolutionDto: AddSolutionDto) {
    return this.solutionsRepository.addSolution(addSolutionDto);
  }

  updateSolution(updateSolutionDto: UpdateSolutionDto, solutionId: string) {
    return this.solutionsRepository.updateSolutionById(
      solutionId,
      updateSolutionDto,
    );
  }

  removeSolutionById(solutionId: string) {
    return this.solutionsRepository.removeSolutionById(solutionId);
  }
}
