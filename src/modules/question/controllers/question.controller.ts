import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { QuestionService } from '../services/question.service';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { QuestionEntity } from '../entities/question.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AppRequest } from '../../shared/types/app-request.type';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AddThemeToQuestionDto } from '../dto/add-theme-to-question.dto';
import { RemoveThemeFromQuestionDto } from '../dto/remove-theme-from-question.dto';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { PaginationResponse } from '../../shared/types/pagination-response.type';

@Controller('questions')
@UseGuards(JwtAuthGuard)
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  public create(
    @Body() createQuestionDto: CreateQuestionDto,
    @Req() request: AppRequest,
  ): Promise<QuestionEntity> {
    return this.questionService.create(request.user.id, createQuestionDto);
  }

  @Get()
  public findAll(@Query() paginationDto: PaginationDto): Promise<PaginationResponse<QuestionEntity[]>> {
    return this.questionService.findAll(paginationDto);
  }

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<QuestionEntity> {
    return this.questionService.findOne(id);
  }

  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ): Promise<UpdateResult> {
    return this.questionService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.questionService.remove(id);
  }

  @Post(':questionId/themes')
  public addThemeToQuestion(
    @Param('questionId') questionId: string,
    @Body() addThemeToQuestionDto: AddThemeToQuestionDto,
  ): Promise<void> {
    return this.questionService.addThemeToQuestion(questionId, addThemeToQuestionDto.id);
  }

  @Delete(':questionId/themes')
  public removeThemeFromQuestion(
    @Param('questionId') questionId: string,
    @Body() removeThemeFromQuestionDto: RemoveThemeFromQuestionDto,
  ): Promise<void> {
    return this.questionService.removeThemeFromQuestion(questionId, removeThemeFromQuestionDto.id);
  }
}
