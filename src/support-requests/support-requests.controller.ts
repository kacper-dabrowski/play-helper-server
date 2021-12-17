import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  AddSupportRequestDto,
  UpdateSupportRequestDto,
} from './dto/support-request.dto';
import { SupportRequest } from './support-requests.entity';
import { SupportRequestsService } from './support-requests.service';

@Controller('support-requests')
export class SupportRequestsController {
  constructor(private supportRequestService: SupportRequestsService) {}
  @Get()
  fetchSupportRequests() {
    return this.supportRequestService.getAllSupportRequests();
  }

  @Post()
  addSupportRequest(
    @Body() addSupportRequestDto: AddSupportRequestDto,
  ): Promise<SupportRequest> {
    return this.supportRequestService.addSupportRequest(addSupportRequestDto);
  }

  @Put(':id')
  updateSupportRequest(
    @Param('id') supportRequestId: string,
    @Body() updateSupportRequestDto: UpdateSupportRequestDto,
  ) {
    console.log(supportRequestId);

    return this.supportRequestService.updateSupportRequest(
      supportRequestId,
      updateSupportRequestDto,
    );
  }
  @Delete(':id')
  removeSupportRequest(@Param('id') supportRequestId: string) {
    return this.supportRequestService.removeSupportRequest(supportRequestId);
  }
}
