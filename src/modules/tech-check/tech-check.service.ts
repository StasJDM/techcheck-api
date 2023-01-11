import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from '../shared/dto/pagination.dto';
import { TechCheckTemplateService } from '../tech-check-template/tech-check-template.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateTechCheckFromTemplateDto } from './dto/create-tech-check-from-template.dto';
import { UpdateTechCheckFromTemplateDto } from './dto/update-tech-check-from-template.dto';
import { TechCheckEntity, TechCheckType } from './entities/tech-check.entity';
import { TechCheckQuestionEntity } from './entities/tech-check-question.entity';
import { PaginationResponse } from '../shared/types/pagination-response.type';

@Injectable()
export class TechCheckService {
  constructor(
    @InjectRepository(TechCheckEntity)
    private readonly techCheckRepository: Repository<TechCheckEntity>,
    @InjectRepository(TechCheckQuestionEntity)
    private readonly techCheckQuestionRepository: Repository<TechCheckQuestionEntity>,
    private readonly techCheckTemplateService: TechCheckTemplateService,
  ) {}

  public async createFromTemplate(
    createTechCheckDto: CreateTechCheckFromTemplateDto,
    techCheckerId: string,
  ): Promise<TechCheckEntity> {
    const techCheckTemplate = await this.techCheckTemplateService.findOne(
      createTechCheckDto.techCheckTemplateId,
      techCheckerId,
    );

    if (!techCheckTemplate) {
      throw new NotFoundException('Tech check template not found or you have no access');
    }

    const techCheck = await this.techCheckRepository.save({
      ...createTechCheckDto,
      techCheckerId,
      type: TechCheckType.FromTemplate,
    });

    const saveTechCheckQuestionsPromises = techCheckTemplate.questions.map((question) =>
      this.techCheckQuestionRepository.save({
        questionId: question.id,
        techCheckId: techCheck.id,
      }),
    );

    await Promise.all(saveTechCheckQuestionsPromises);

    return techCheck;
  }

  public async findAll(
    paginationDto: PaginationDto,
    techCheckerId: string,
  ): Promise<PaginationResponse<TechCheckEntity[]>> {
    const { skipTakeOptions } = paginationDto;

    const [data, total] = await this.techCheckRepository.findAndCount({
      where: { techCheckerId },
      ...skipTakeOptions,
    });

    return {
      data,
      pagination: { ...paginationDto.params, total },
    };
  }

  public findOne(id: string, techCheckerId: string): Promise<TechCheckEntity> {
    return this.techCheckRepository.findOne({
      where: { id, techCheckerId },
      relations: ['questions', 'questions.question'],
    });
  }

  public async update(
    id: string,
    updateTechCheckDto: UpdateTechCheckFromTemplateDto,
    techCheckerId: string,
  ): Promise<UpdateResult> {
    const techCheck = await this.findOne(id, techCheckerId);

    if (!techCheck) {
      throw new NotFoundException('Tech check not found or you have no access');
    }

    const { questionsIds, ...toUpdateTechCheckData } = updateTechCheckDto;

    if (questionsIds) {
      await this.techCheckQuestionRepository.delete({ techCheckId: id }); // TODO: Soft delete

      const saveQuestionPromises = updateTechCheckDto.questionsIds.map((questionId) =>
        this.techCheckQuestionRepository.save({ techCheckId: id, questionId }),
      );

      await Promise.all(saveQuestionPromises);
    }

    return this.techCheckRepository.update({ id, techCheckerId }, toUpdateTechCheckData);
  }

  public remove(id: string, techCheckerId: string): Promise<DeleteResult> {
    return this.techCheckRepository.softDelete({ id, techCheckerId });
  }
}
