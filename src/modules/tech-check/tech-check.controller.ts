import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { TechCheckService } from './tech-check.service';
import { CreateTechCheckFromTemplateDto } from './dto/create-tech-check-from-template.dto';
import { UpdateTechCheckFromTemplateDto } from './dto/update-tech-check-from-template.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TechCheckEntity } from './entities/tech-check.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AppRequest } from '../shared/types/app-request.type';
import { PaginationDto } from '../shared/dto/pagination.dto';
import { PaginationResponse } from '../shared/types/pagination-response.type';
import { UpdateTechCheckQuestionInfoDto } from './dto/update-tech-check-question-info.dto';

@Controller('tech-checks')
@UseGuards(JwtAuthGuard)
export class TechCheckController {
  constructor(private readonly techCheckService: TechCheckService) {}

  @Post('from-template')
  public createFromTemplate(
    @Body() createTechCheckDto: CreateTechCheckFromTemplateDto,
    @Req() req: AppRequest,
  ): Promise<TechCheckEntity> {
    return this.techCheckService.createFromTemplate(createTechCheckDto, req.user.id);
  }

  @Get()
  public findAll(
    @Query() paginationDto: PaginationDto,
    @Req() req: AppRequest,
  ): Promise<PaginationResponse<TechCheckEntity[]>> {
    return this.techCheckService.findAll(paginationDto, req.user.id);
  }

  @Get(':id')
  public findOne(@Param('id') id: string, @Req() req: AppRequest): Promise<TechCheckEntity> {
    return this.techCheckService.findOne(id, req.user.id);
  }

  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body() updateTechCheckDto: UpdateTechCheckFromTemplateDto,
    @Req() req: AppRequest,
  ): Promise<UpdateResult> {
    return this.techCheckService.update(id, updateTechCheckDto, req.user.id);
  }

  @Patch(':techCheckId/questions/:questionId')
  public updateTechCheckQuestionInfo(
    @Param('techCheckId') techCheckId: string,
    @Param('questionId') questionId: string,
    @Body() updateTechCheckQuestionInfoDto: UpdateTechCheckQuestionInfoDto,
    @Req() req: AppRequest,
  ): Promise<UpdateResult> {
    return this.techCheckService.updateTechCheckQuestionInfo(
      techCheckId,
      questionId,
      updateTechCheckQuestionInfoDto,
      req.user.id,
    );
  }

  @Delete(':id')
  public remove(@Param('id') id: string, @Req() req: AppRequest): Promise<DeleteResult> {
    return this.techCheckService.remove(id, req.user.id);
  }
}
