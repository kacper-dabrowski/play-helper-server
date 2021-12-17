import { EntityRepository, Repository } from 'typeorm';
import { AddSupportRequestDto } from './dto/support-request.dto';
import { SupportRequest } from './support-requests.entity';

@EntityRepository(SupportRequest)
export class SupportRequestRepository extends Repository<SupportRequest> {
  async createSupportRequest(addSupportRequestDto: AddSupportRequestDto) {
    const createdTask = this.create(addSupportRequestDto);

    await this.save(createdTask);

    return createdTask;
  }

  async getSupportRequests(): Promise<SupportRequest[]> {
    return this.find();
  }

  async removeSupportRequestById(supportRequestId: string): Promise<boolean> {
    const { affected } = await this.delete({ _id: supportRequestId });

    return Boolean(affected);
  }
}
