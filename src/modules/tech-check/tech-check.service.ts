import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from '../shared/dto/pagination.dto';
import { TechCheckTemplateService } from '../tech-check-template/tech-check-template.service';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateTechCheckFromTemplateDto } from './dto/create-tech-check-from-template.dto';
import { UpdateTechCheckFromTemplateDto } from './dto/update-tech-check-from-template.dto';
import { TechCheckEntity, TechCheckType } from './entities/tech-check.entity';
import { TechCheckQuestionEntity } from './entities/tech-check-question.entity';
import { PaginationResponse } from '../shared/types/pagination-response.type';
import { UpdateTechCheckQuestionInfoDto } from './dto/update-tech-check-question-info.dto';

@Injectable()
export class TechCheckService {
  constructor(
    private readonly dataSource: DataSource,
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

    return this.dataSource.transaction<TechCheckEntity>(async (transactionManager) => {
      const techCheck = await transactionManager.save(TechCheckEntity, {
        ...createTechCheckDto,
        techCheckerId,
        type: TechCheckType.FromTemplate,
      });

      const saveTechCheckQuestionsPromises = techCheckTemplate.questions.map((question) =>
        transactionManager.save(TechCheckQuestionEntity, {
          questionId: question.id,
          techCheckId: techCheck.id,
        }),
      );

      await Promise.all(saveTechCheckQuestionsPromises);

      return techCheck;
    });
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

    return this.dataSource.transaction<UpdateResult>(async (transactionManager) => {
      if (questionsIds) {
        await transactionManager.delete(TechCheckQuestionEntity, { techCheckId: id }); // TODO: Soft delete

        const saveQuestionPromises = updateTechCheckDto.questionsIds.map((questionId) =>
          transactionManager.save(TechCheckQuestionEntity, { techCheckId: id, questionId }),
        );

        await Promise.all(saveQuestionPromises);
      }

      return transactionManager.update(TechCheckEntity, { id, techCheckerId }, toUpdateTechCheckData);
    });
  }

  public remove(id: string, techCheckerId: string): Promise<DeleteResult> {
    return this.techCheckRepository.softDelete({ id, techCheckerId });
  }

  public async updateTechCheckQuestionInfo(
    techCheckId: string,
    questionId: string,
    updateTechCheckQuestionInfoDto: UpdateTechCheckQuestionInfoDto,
    techCheckerId: string,
  ): Promise<UpdateResult> {
    const techCheck = await this.findOne(techCheckId, techCheckerId);

    if (!techCheck) {
      throw new NotFoundException('Tech check not found or you have no access');
    }

    return this.techCheckQuestionRepository.update(questionId, updateTechCheckQuestionInfoDto);
  }
}
