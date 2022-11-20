import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  pseudo: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ required: false, nullable: true })
  hash: string | null;

  @ApiProperty({ required: false, nullable: true })
  image: string | null;
}
