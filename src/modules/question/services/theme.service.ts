import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { PaginationResponse } from '../../shared/types/pagination-response.type';
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

  public create(createThemeDto: CreateThemeDto, id: string): Promise<ThemeEntity> {
    return this.themeRepository.save({ creatorId: id, ...createThemeDto });
  }

  public async findAll(paginationDto: PaginationDto): Promise<PaginationResponse<ThemeEntity[]>> {
    const { skipTakeOptions } = paginationDto;

    const [data, total] = await this.themeRepository.findAndCount({ ...skipTakeOptions });

    return {
      data,
      pagination: { ...paginationDto.params, total },
    };
  }

  public findOne(id: string): Promise<ThemeEntity> {
    return this.themeRepository.findOne({ where: { id } });
  }

  public update(id: string, updateThemeDto: UpdateThemeDto): Promise<UpdateResult> {
    return this.themeRepository.update(id, updateThemeDto);
  }

  public delete(id: string): Promise<DeleteResult> {
    return this.themeRepository.softDelete(id);
  }
}
