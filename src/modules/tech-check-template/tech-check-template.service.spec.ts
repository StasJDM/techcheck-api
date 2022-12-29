import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TechCheckTemplateEntity } from './entities/tech-check-template.entity';
import { TechCheckTemplateService } from './tech-check-template.service';

describe('TechCheckTemplateService', () => {
  let service: TechCheckTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TechCheckTemplateService,
        {
          provide: getRepositoryToken(TechCheckTemplateEntity),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<TechCheckTemplateService>(TechCheckTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});