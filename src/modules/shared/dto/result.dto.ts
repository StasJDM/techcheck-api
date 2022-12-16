import { ApiProperty } from '@nestjs/swagger';

export class ResultDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  statusCode: number;
}
