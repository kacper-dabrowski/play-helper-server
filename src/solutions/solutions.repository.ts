import { EntityRepository, Repository } from 'typeorm';
import { AddSolutionDto, UpdateSolutionDto } from './dto/solutions.dto';
import { Solution } from './solution.entity';

@EntityRepository(Solution)
export class SolutionsRepository extends Repository<Solution> {
  getAllSolutions(): Promise<Solution[]> {
    return this.find();
  }

  async addSolution(addSolutionDto: AddSolutionDto): Promise<Solution> {
    const createdSolution = this.create(addSolutionDto);

    this.save(createdSolution);

    return createdSolution;
  }

  async updateSolutionById(
    solutionId: string,
    updateSolutionDto: UpdateSolutionDto,
  ): Promise<boolean> {
    const { affected } = await this.update(solutionId, updateSolutionDto);

    return !!affected;
  }

  async removeSolutionById(solutionId: string) {
    const { affected } = await this.delete(solutionId);

    return !!affected;
  }
}
