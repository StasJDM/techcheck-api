import { ApiProperty } from '@nestjs/swagger';
import { ObjectLiteral, UpdateResult } from 'typeorm';

export class ApiUpdateResultDto extends UpdateResult {
  @ApiProperty()
  raw: unknown;

  @ApiProperty()
  affected: number;

  @ApiProperty()
  generatedMaps: ObjectLiteral[];
}
