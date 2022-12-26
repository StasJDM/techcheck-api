import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

export interface SkipTakeOptions {
  skip?: number;
  take?: number;
  order?: Record<string, OrderOptions>;
}

export enum OrderOptions {
  ASC = 'ASC',
  DESC = 'DESC',
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

  @IsOptional()
  orderBy?: string;

  @IsEnum(OrderOptions)
  @IsOptional()
  order?: OrderOptions;

  public get skipTakeOptions(): SkipTakeOptions {
    return {
      skip: (this.page - 1) * this.pageSize,
      take: this.pageSize,
      order: this.orderBy ? { [this.orderBy]: this.order || OrderOptions.ASC } : {},
    };
  }
}
