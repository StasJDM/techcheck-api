import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateThemeDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;
}
