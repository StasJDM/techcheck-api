import { Test, TestingModule } from '@nestjs/testing';
import { TechCheckTemplateController } from './tech-check-template.controller';
import { TechCheckTemplateService } from './tech-check-template.service';

describe('TechCheckTemplateController', () => {
  let controller: TechCheckTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TechCheckTemplateController],
      providers: [
        {
          provide: TechCheckTemplateService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<TechCheckTemplateController>(TechCheckTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
