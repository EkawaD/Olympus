import { ApiProperty, PartialType } from '@nestjs/swagger';

export class AnonDto {
  @ApiProperty()
  pseudo: string;
  @ApiProperty()
  avatar: string;
}
export class UpdateAnonDto extends PartialType(AnonDto) {}
