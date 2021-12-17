import { Test, TestingModule } from '@nestjs/testing';
import { SupportRequestsController } from './support-requests.controller';

describe('SupportRequestsController', () => {
  let controller: SupportRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupportRequestsController],
    }).compile();

    controller = module.get<SupportRequestsController>(
      SupportRequestsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
