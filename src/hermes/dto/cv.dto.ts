import { ApiProperty } from '@nestjs/swagger';
import {
  Lettre,
  Ref,
  Diplome,
  Experience,
  Project,
  Skill,
  Hobby,
} from '@prisma/client';

export class CVDto {
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
