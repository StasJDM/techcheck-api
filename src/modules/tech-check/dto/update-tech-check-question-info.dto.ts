import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateTechCheckQuestionInfoDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  mark?: number;

  @IsOptional()
  @IsString()
  note?: string;
}
