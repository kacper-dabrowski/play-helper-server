import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AddSupportRequestDto,
  UpdateSupportRequestDto,
} from './dto/support-request.dto';
import { SupportRequest } from './support-requests.entity';
import { SupportRequestRepository } from './support-requests.repository';

@Injectable()
export class SupportRequestsService {
  constructor(
    @InjectRepository(SupportRequestRepository)
    private supportRequestsRepository: SupportRequestRepository,
  ) {}
  getAllSupportRequests(): Promise<SupportRequest[]> {
    return this.supportRequestsRepository.getSupportRequests();
  }

  addSupportRequest(addSrqDto: AddSupportRequestDto): Promise<SupportRequest> {
    return this.supportRequestsRepository.createSupportRequest(addSrqDto);
  }

  removeSupportRequest(supportRequestId: string) {
    return this.supportRequestsRepository.removeSupportRequestById(
      supportRequestId,
    );
  }

  async updateSupportRequest(
    supportRequestId: string,
    updateSupportRequestDto: UpdateSupportRequestDto,
  ) {
    const supportRequestToUpdate = await this.supportRequestsRepository.findOne(
      supportRequestId,
    );

    if (!supportRequestToUpdate) {
      throw new NotFoundException();
    }

    const { affected } = await this.supportRequestsRepository.update(
      supportRequestId,
      updateSupportRequestDto,
    );

    return Boolean(affected);
  }
}
