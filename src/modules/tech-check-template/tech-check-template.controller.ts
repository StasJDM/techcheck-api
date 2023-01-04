import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { TechCheckTemplateService } from './tech-check-template.service';
import { CreateTechCheckTemplateDto } from './dto/create-tech-check-template.dto';
import { UpdateTechCheckTemplateDto } from './dto/update-tech-check-template.dto';
import { TechCheckTemplateEntity } from './entities/tech-check-template.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AppRequest } from '../shared/types/app-request.type';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

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
  public findAll(@Req() appRequest: AppRequest): Promise<TechCheckTemplateEntity[]> {
    return this.techCheckTemplateService.findAll(appRequest.user.id);
  }

  @Get(':id')
  public findOne(@Param('id') id: string, @Req() appRequest: AppRequest): Promise<TechCheckTemplateEntity> {
    return this.techCheckTemplateService.findOne(id, appRequest.user.id);
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
