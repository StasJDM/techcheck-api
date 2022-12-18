import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateThemeDto } from '../dto/create-theme.dto';
import { UpdateThemeDto } from '../dto/update-theme.dto';
import { ThemeEntity } from '../entities/theme.entity';

@Injectable()
export class ThemeService {
  constructor(
    @InjectRepository(ThemeEntity)
    private readonly themeRepository: Repository<ThemeEntity>,
  ) {}

  create(createThemeDto: CreateThemeDto, id: string): Promise<ThemeEntity> {
    return this.themeRepository.save({ creatorId: id, ...createThemeDto });
  }

  findAll(): Promise<ThemeEntity[]> {
    return this.themeRepository.find();
  }

  findOne(id: string): Promise<ThemeEntity> {
    return this.themeRepository.findOne({ where: { id } });
  }

  update(id: string, updateThemeDto: UpdateThemeDto): Promise<UpdateResult> {
    return this.themeRepository.update(id, updateThemeDto);
  }

  delete(id: string): Promise<DeleteResult> {
    return this.themeRepository.softDelete(id);
  }
}
