import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AppRequest } from '../../shared/types/app-request.type';
import { CreateThemeDto } from '../dto/create-theme.dto';
import { UpdateThemeDto } from '../dto/update-theme.dto';
import { ThemeEntity } from '../entities/theme.entity';
import { ThemeService } from '../services/theme.service';

@Controller('themes')
@UseGuards(JwtAuthGuard)
export class ThemeControllers {
  constructor(private readonly themeService: ThemeService) {}

  @Post()
  public create(@Body() createThemeDto: CreateThemeDto, @Req() request: AppRequest): Promise<ThemeEntity> {
    return this.themeService.create(createThemeDto, request.user.id);
  }

  @Get()
  findAll(): Promise<ThemeEntity[]> {
    return this.themeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') themeId: string): Promise<ThemeEntity> {
    return this.themeService.findOne(themeId);
  }

  @Patch(':id')
  update(@Param('id') themeId: string, @Body() updateThemeDto: UpdateThemeDto): Promise<UpdateResult> {
    return this.themeService.update(themeId, updateThemeDto);
  }

  @Delete(':id')
  remove(@Param('id') themeId: string): Promise<DeleteResult> {
    return this.themeService.delete(themeId);
  }
}
