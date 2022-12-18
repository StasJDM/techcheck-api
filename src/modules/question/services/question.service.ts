import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { QuestionEntity } from '../entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
  ) {}

  create(userId: string, createQuestionDto: CreateQuestionDto): Promise<QuestionEntity> {
    return this.questionRepository.save({ creatorId: userId, ...createQuestionDto });
  }

  findAll(): Promise<QuestionEntity[]> {
    return this.questionRepository.find();
  }

  findOne(id: string): Promise<QuestionEntity> {
    return this.questionRepository.findOne({ where: { id } });
  }

  update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<UpdateResult> {
    return this.questionRepository.update(id, updateQuestionDto);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.questionRepository.softDelete(id);
  }
}
