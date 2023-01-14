import { Test, TestingModule } from '@nestjs/testing';
import { TechCheckController } from './tech-check.controller';
import { TechCheckService } from './tech-check.service';

describe('TechCheckController', () => {
  let controller: TechCheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TechCheckController],
      providers: [{ provide: TechCheckService, useValue: {} }],
    }).compile();

    controller = module.get<TechCheckController>(TechCheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
