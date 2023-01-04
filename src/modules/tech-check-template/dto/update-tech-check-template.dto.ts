import { PartialType } from '@nestjs/swagger';
import { CreateTechCheckTemplateDto } from './create-tech-check-template.dto';

export class UpdateTechCheckTemplateDto extends PartialType(CreateTechCheckTemplateDto) {}
