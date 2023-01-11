import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TechCheckTemplateService } from '../tech-check-template/tech-check-template.service';
import { TechCheckEntity } from './entities/tech-check.entity';
import { TechCheckService } from './tech-check.service';

describe('TechCheckService', () => {
  let service: TechCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TechCheckService,
        { provide: TechCheckTemplateService, useValue: {} },
        { provide: getRepositoryToken(TechCheckEntity), useValue: {} },
        { provide: DataSource, useValue: {} },
      ],
    }).compile();

    service = module.get<TechCheckService>(TechCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
