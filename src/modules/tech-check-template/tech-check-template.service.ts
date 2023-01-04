import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateTechCheckTemplateDto } from './dto/create-tech-check-template.dto';
import { UpdateTechCheckTemplateDto } from './dto/update-tech-check-template.dto';
import { TechCheckTemplateQuestionEntity } from './entities/tech-check-template-question.entity';
import { TechCheckTemplateEntity } from './entities/tech-check-template.entity';

@Injectable()
export class TechCheckTemplateService {
  constructor(
    @InjectRepository(TechCheckTemplateEntity)
    private readonly techCheckTemplateRepository: Repository<TechCheckTemplateEntity>,
    @InjectRepository(TechCheckTemplateQuestionEntity)
    private readonly techCheckTemplateQuestionRepository: Repository<TechCheckTemplateQuestionEntity>,
  ) {}

  public async create(
    ownerId: string,
    createTechCheckTemplateDto: CreateTechCheckTemplateDto,
  ): Promise<TechCheckTemplateEntity> {
    const techCheckTemplate = await this.techCheckTemplateRepository.save({
      ...createTechCheckTemplateDto,
      ownerId,
    });

    await Promise.all(
      (createTechCheckTemplateDto.questionsIds || []).map((questionId) =>
        this.techCheckTemplateQuestionRepository.save({
          techCheckTemplateId: techCheckTemplate.id,
          questionId,
        }),
      ),
    );

    return techCheckTemplate;
  }

  public findAll(ownerId: string): Promise<TechCheckTemplateEntity[]> {
    return this.techCheckTemplateRepository.find({ where: { ownerId }, relations: ['questions'] });
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

    const { questionsIds, ...toUpdateDto } = updateTechCheckTemplateDto;
    if (questionsIds) {
      await this.techCheckTemplateQuestionRepository.delete({ techCheckTemplateId });
      await Promise.all(
        questionsIds.map((questionId) =>
          this.techCheckTemplateQuestionRepository.save({
            techCheckTemplateId,
            questionId,
          }),
        ),
      );
    }

    return this.techCheckTemplateRepository.update({ id: techCheckTemplateId, ownerId }, toUpdateDto);
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
