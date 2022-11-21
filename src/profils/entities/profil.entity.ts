import {
  Diplome,
  Experience,
  Hobby,
  Lettre,
  Profil,
  Project,
  Ref,
  Skill,
} from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ProfilEntity implements Profil {
  @ApiProperty()
  id: number;
  @ApiProperty()
  userId: number;

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

  @ApiProperty()
  lettres: Lettre[];
  @ApiProperty()
  refs: Ref[];
  @ApiProperty()
  diplomes: Diplome[];
  @ApiProperty()
  experiences: Experience[];
  @ApiProperty()
  projects: Project[];
  @ApiProperty()
  skills: Skill[];
  @ApiProperty()
  hobbies: Hobby[];
}
