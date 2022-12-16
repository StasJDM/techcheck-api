import { ApiProperty } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

export class ApiDeleteResultDto extends DeleteResult {
  @ApiProperty()
  raw: unknown;

  @ApiProperty()
  affected: number | null;
}
