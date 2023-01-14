import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { TechCheckTemplateService } from './tech-check-template.service';
import { CreateTechCheckTemplateDto } from './dto/create-tech-check-template.dto';
import { UpdateTechCheckTemplateDto } from './dto/update-tech-check-template.dto';
import { TechCheckTemplateEntity } from './entities/tech-check-template.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AppRequest } from '../shared/types/app-request.type';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddQuestionToTechCheckTemplateDto } from './dto/add-question-to-tech-check-template.dto';
import { RemoveQuestionFromTechCheckTemplateDto } from './dto/remove-question-from-tech-check-template.dto';
import { PaginationResponse } from '../shared/types/pagination-response.type';
import { PaginationDto } from '../shared/dto/pagination.dto';

@UseGuards(JwtAuthGuard)
@Controller('tech-check-templates')
export class TechCheckTemplateController {
  constructor(private readonly techCheckTemplateService: TechCheckTemplateService) {}

  @Post()
  public create(
    @Req() appRequest: AppRequest,
    @Body() createTechCheckTemplateDto: CreateTechCheckTemplateDto,
  ): Promise<TechCheckTemplateEntity> {
    return this.techCheckTemplateService.create(appRequest.user.id, createTechCheckTemplateDto);
  }

  @Get()
  public findAll(
    @Req() appRequest: AppRequest,
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationResponse<TechCheckTemplateEntity[]>> {
    return this.techCheckTemplateService.findAll(appRequest.user.id, paginationDto);
  }

  @Get(':id')
  public findOne(@Param('id') id: string, @Req() appRequest: AppRequest): Promise<TechCheckTemplateEntity> {
    return this.techCheckTemplateService.findOne(id, appRequest.user.id);
  }

  @Post(':id')
  public addQuestionToTechCheckTemplate(
    @Param('id') techCheckTemplateId: string,
    @Body() addQuestionToTechCheckTemplateDto: AddQuestionToTechCheckTemplateDto,
    @Req() appRequest: AppRequest,
  ): Promise<TechCheckTemplateEntity> {
    return this.techCheckTemplateService.addQuestionToTechCheckTemplate(
      techCheckTemplateId,
      addQuestionToTechCheckTemplateDto.id,
      appRequest.user.id,
    );
  }

  @Delete(':id')
  public removeQuestionFromTechCheckTemplate(
    @Param('id') techCheckTemplateId: string,
    @Body() removeQuestionFromTechCheckTemplateDto: RemoveQuestionFromTechCheckTemplateDto,
    @Req() appRequest: AppRequest,
  ): Promise<TechCheckTemplateEntity> {
    return this.techCheckTemplateService.removeQuestionFromTechCheckTemplate(
      techCheckTemplateId,
      removeQuestionFromTechCheckTemplateDto.id,
      appRequest.user.id,
    );
  }

  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body() updateTechCheckTemplateDto: UpdateTechCheckTemplateDto,
    @Req() appRequest: AppRequest,
  ): Promise<UpdateResult> {
    return this.techCheckTemplateService.update(id, updateTechCheckTemplateDto, appRequest.user.id);
  }

  @Delete(':id')
  public remove(@Param('id') id: string, @Req() appRequest: AppRequest): Promise<DeleteResult> {
    return this.techCheckTemplateService.remove(id, appRequest.user.id);
  }
}
