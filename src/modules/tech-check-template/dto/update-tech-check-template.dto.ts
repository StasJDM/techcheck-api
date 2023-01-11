import { PartialType } from '@nestjs/mapped-types';
import { CreateTechCheckTemplateDto } from './create-tech-check-template.dto';

export class UpdateTechCheckTemplateDto extends PartialType(CreateTechCheckTemplateDto) {}
