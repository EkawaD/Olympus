import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  avatar: string;

  @ApiProperty()
  name: string;
}
