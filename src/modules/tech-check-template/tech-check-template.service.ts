import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { PaginationDto } from '../shared/dto/pagination.dto';
import { PaginationResponse } from '../shared/types/pagination-response.type';
import { CreateTechCheckTemplateDto } from './dto/create-tech-check-template.dto';
import { UpdateTechCheckTemplateDto } from './dto/update-tech-check-template.dto';
import { TechCheckTemplateQuestionEntity } from './entities/tech-check-template-question.entity';
import { TechCheckTemplateEntity } from './entities/tech-check-template.entity';

@Injectable()
export class TechCheckTemplateService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(TechCheckTemplateEntity)
    private readonly techCheckTemplateRepository: Repository<TechCheckTemplateEntity>,
    @InjectRepository(TechCheckTemplateQuestionEntity)
    private readonly techCheckTemplateQuestionRepository: Repository<TechCheckTemplateQuestionEntity>,
  ) {}

  public async create(ownerId: string, createTechCheckTemplateDto: CreateTechCheckTemplateDto): Promise<TechCheckTemplateEntity> {
    return this.dataSource.manager.transaction<TechCheckTemplateEntity>(async (transactionManager) => {
      const techCheckTemplate = await transactionManager.save(TechCheckTemplateEntity, {
        ...createTechCheckTemplateDto,
        ownerId,
      });

      await Promise.all(
        (createTechCheckTemplateDto.questionsIds || []).map((questionId) =>
          transactionManager.save(TechCheckTemplateQuestionEntity, {
            techCheckTemplateId: techCheckTemplate.id,
            questionId,
          }),
        ),
      );

      return techCheckTemplate;
    });
  }

  public async findAll(ownerId: string, paginationDto: PaginationDto): Promise<PaginationResponse<TechCheckTemplateEntity[]>> {
    const { skipTakeOptions } = paginationDto;

    const [data, total] = await this.techCheckTemplateRepository.findAndCount({
      where: { ownerId },
      relations: ['questions'],
      ...skipTakeOptions,
    });

    return { data, pagination: { ...paginationDto.params, total } };
  }

  public findOne(id: string, ownerId: string): Promise<TechCheckTemplateEntity> {
    return this.techCheckTemplateRepository.findOne({
      where: { id, ownerId },
      relations: ['questions'],
    });
  }

  public async update(
    techCheckTemplateId: string,
    updateTechCheckTemplateDto: UpdateTechCheckTemplateDto,
    ownerId: string,
  ): Promise<UpdateResult> {
    const techCheckTemplate = await this.techCheckTemplateRepository.findOne({
      where: { id: techCheckTemplateId },
    });
    if (techCheckTemplate?.ownerId !== ownerId) {
      throw new ForbiddenException('You have not access to this tech check template');
    }

    return this.dataSource.manager.transaction<UpdateResult>(async (transactionManager) => {
      const { questionsIds, ...toUpdateDto } = updateTechCheckTemplateDto;
      if (questionsIds) {
        await transactionManager.delete(TechCheckTemplateQuestionEntity, { techCheckTemplateId });
        await Promise.all(
          questionsIds.map((questionId) =>
            transactionManager.save(TechCheckTemplateQuestionEntity, {
              techCheckTemplateId,
              questionId,
            }),
          ),
        );
      }

      return transactionManager.update(TechCheckTemplateEntity, { id: techCheckTemplateId, ownerId }, toUpdateDto);
    });
  }

  public remove(id: string, ownerId: string): Promise<DeleteResult> {
    return this.techCheckTemplateRepository.softDelete({ id, ownerId });
  }

  public async addQuestionToTechCheckTemplate(
    techCheckTemplateId: string,
    questionId: string,
    ownerId: string,
  ): Promise<TechCheckTemplateEntity> {
    const techCheckTemplate = await this.findOne(techCheckTemplateId, ownerId);
    if (!techCheckTemplate) {
      throw new NotFoundException('Tech check was not found');
    }

    await this.techCheckTemplateQuestionRepository.save({ techCheckTemplateId, questionId });

    return this.findOne(techCheckTemplateId, ownerId);
  }

  public async removeQuestionFromTechCheckTemplate(
    techCheckTemplateId: string,
    questionId: string,
    ownerId: string,
  ): Promise<TechCheckTemplateEntity> {
    const techCheckTemplate = await this.findOne(techCheckTemplateId, ownerId);
    if (!techCheckTemplate) {
      throw new NotFoundException('Tech check was not found');
    }

    await this.techCheckTemplateQuestionRepository.delete({ techCheckTemplateId, questionId });

    return this.findOne(techCheckTemplateId, ownerId);
  }
}
