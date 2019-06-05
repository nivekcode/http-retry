import { Test, TestingModule } from '@nestjs/testing';
import { GreetingControllerController } from './greeting-controller.controller';

describe('GreetingController Controller', () => {
  let controller: GreetingControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GreetingControllerController],
    }).compile();

    controller = module.get<GreetingControllerController>(GreetingControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
