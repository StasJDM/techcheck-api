import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  question: string;

  @IsOptional()
  @IsString()
  answer: string;
}
