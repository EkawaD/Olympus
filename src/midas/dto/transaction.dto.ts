import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  payer: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  payee: string;

  @ApiProperty()
  groupId: number;
}

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {}
