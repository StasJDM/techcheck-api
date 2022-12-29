import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateTechCheckTemplateDto } from './dto/create-tech-check-template.dto';
import { UpdateTechCheckTemplateDto } from './dto/update-tech-check-template.dto';
import { TechCheckTemplateEntity } from './entities/tech-check-template.entity';

@Injectable()
export class TechCheckTemplateService {
  constructor(
    @InjectRepository(TechCheckTemplateEntity)
    private techCheckTemplateRepository: Repository<TechCheckTemplateEntity>,
  ) {}

  public create(
    ownerId: string,
    createTechCheckTemplateDto: CreateTechCheckTemplateDto,
  ): Promise<TechCheckTemplateEntity> {
    return this.techCheckTemplateRepository.save({ ...createTechCheckTemplateDto, ownerId });
  }

  public findAll(): Promise<TechCheckTemplateEntity[]> {
    return this.techCheckTemplateRepository.find();
  }

  public findOne(id: string): Promise<TechCheckTemplateEntity> {
    return this.techCheckTemplateRepository.findOne({ where: { id } });
  }

  public update(id: string, updateTechCheckTemplateDto: UpdateTechCheckTemplateDto): Promise<UpdateResult> {
    return this.techCheckTemplateRepository.update(id, updateTechCheckTemplateDto);
  }

  public remove(id: string): Promise<DeleteResult> {
    return this.techCheckTemplateRepository.softDelete(id);
  }
}
