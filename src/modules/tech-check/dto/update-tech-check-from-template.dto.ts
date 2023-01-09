import { PartialType } from '@nestjs/swagger';
import { CreateTechCheckFromTemplateDto } from './create-tech-check-from-template.dto';

export class UpdateTechCheckFromTemplateDto extends PartialType(CreateTechCheckFromTemplateDto) {}
