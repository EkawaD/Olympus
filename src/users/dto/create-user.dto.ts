import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  pseudo: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ required: false, default: '/' })
  image?: string;
}
