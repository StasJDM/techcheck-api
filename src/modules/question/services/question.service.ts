import { Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { QuestionEntity } from '../entities/question.entity';
import { QuestionRepository } from '../repositories/question.repository';

@Injectable()
export class QuestionService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  public create(userId: string, createQuestionDto: CreateQuestionDto): Promise<QuestionEntity> {
    return this.questionRepository.save({ creatorId: userId, ...createQuestionDto });
  }

  public findAll(): Promise<QuestionEntity[]> {
    return this.questionRepository.find({ relations: ['themes'] });
  }

  public findOne(id: string): Promise<QuestionEntity> {
    return this.questionRepository.findOne({ where: { id }, relations: ['themes'] });
  }

  public update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<UpdateResult> {
    return this.questionRepository.update(id, updateQuestionDto);
  }

  public remove(id: string): Promise<DeleteResult> {
    return this.questionRepository.softDelete(id);
  }

  public addThemeToQuestion(questionId: string, themeId: string): Promise<void> {
    return this.questionRepository.addTheme(questionId, themeId);
  }

  public removeThemeFromQuestion(questionId: string, themeId: string): Promise<void> {
    return this.questionRepository.removeTheme(questionId, themeId);
  }
}
