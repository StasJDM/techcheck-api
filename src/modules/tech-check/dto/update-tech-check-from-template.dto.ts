import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateTechCheckFromTemplateDto } from './create-tech-check-from-template.dto';

export class UpdateTechCheckFromTemplateDto extends PartialType(CreateTechCheckFromTemplateDto) {
  @IsOptional()
  @IsString({ each: true })
  questionsIds?: string[];
}
