import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTechCheckTemplateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString({ each: true })
  questionsIds?: string[];
}
