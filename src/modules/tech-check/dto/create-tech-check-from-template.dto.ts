import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTechCheckFromTemplateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  person: string;

  @IsNotEmpty()
  @IsUUID()
  techCheckTemplateId: string;
}
