import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportRequestsController } from './support-requests.controller';
import { SupportRequestRepository } from './support-requests.repository';
import { SupportRequestsService } from './support-requests.service';

@Module({
  imports: [TypeOrmModule.forFeature([SupportRequestRepository])],
  providers: [SupportRequestsService],
  controllers: [SupportRequestsController],
})
export class SupportRequestsModule {}
