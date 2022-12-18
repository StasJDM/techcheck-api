import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { QuestionService } from '../services/question.service';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { QuestionEntity } from '../entities/question.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AppRequest } from '../../shared/types/app-request.type';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('questions')
@UseGuards(JwtAuthGuard)
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto, @Req() request: AppRequest): Promise<QuestionEntity> {
    return this.questionService.create(request.user.id, createQuestionDto);
  }

  @Get()
  findAll(): Promise<QuestionEntity[]> {
    return this.questionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<QuestionEntity> {
    return this.questionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto): Promise<UpdateResult> {
    return this.questionService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.questionService.remove(id);
  }
}
