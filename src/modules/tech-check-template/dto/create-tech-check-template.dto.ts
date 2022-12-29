import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTechCheckTemplateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  // TODO: Implement it!
  // @IsOptional()
  // @IsString({ each: true })
  // questionIds?: string[];
}
