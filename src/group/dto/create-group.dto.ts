import { ApiProperty } from '@nestjs/swagger';
import { Anon, User } from '@prisma/client';

export class CreateGroupDto {
  @ApiProperty()
  name: string;
  amons: Anon[];
}
