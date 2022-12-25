import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export interface SkipTakeOptions {
  skip?: number;
  take?: number;
}

export class PaginationDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  readonly pageSize: number = 10;

  total: number;

  public get skipTakeOptions(): SkipTakeOptions {
    return {
      skip: (this.page - 1) * this.pageSize,
      take: this.pageSize,
    };
  }
}
