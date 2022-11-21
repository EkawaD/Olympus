import { ApiProperty } from '@nestjs/swagger';

export class FileDto {
  @ApiProperty()
  name: string;
}
