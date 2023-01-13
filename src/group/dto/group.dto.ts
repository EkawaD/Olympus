import { PartialType } from '@nestjs/swagger';

export class CreateGroupDto {
  name: string;
}

export class UpdateGroupDto extends PartialType(CreateGroupDto) {}
