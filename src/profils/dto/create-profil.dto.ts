import { ApiProperty } from '@nestjs/swagger';

export class CreateProfilDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  color: string;
  @ApiProperty()
  avatar: string;
  @ApiProperty()
  firstname: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  intro: string;

  @ApiProperty()
  website: string | null;
  @ApiProperty()
  tel: string | null;
  @ApiProperty()
  mail: string | null;
  @ApiProperty()
  linkedin: string | null;
  @ApiProperty()
  github: string | null;
}
