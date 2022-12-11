import { ApiProperty } from '@nestjs/swagger';

export class TodoDto {
  @ApiProperty()
  task: string;

  @ApiProperty()
  categoryId: number;
}
