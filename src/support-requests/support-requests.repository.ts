import { EntityRepository, Repository } from 'typeorm';
import { AddSupportRequestDto } from './dto/support-request.dto';
import { SupportRequest } from './support-requests.entity';

@EntityRepository(SupportRequest)
export class SupportRequestRepository extends Repository<SupportRequest> {
  async createSupportRequest(addSupportRequestDto: AddSupportRequestDto) {
    const createdSupportRequest = this.create(addSupportRequestDto);

    await this.save(createdSupportRequest);

    return createdSupportRequest;
  }

  async getSupportRequests(): Promise<SupportRequest[]> {
    return this.find();
  }

  async removeSupportRequestById(supportRequestId: string): Promise<boolean> {
    const { affected } = await this.delete(supportRequestId);

    return Boolean(affected);
  }
}
