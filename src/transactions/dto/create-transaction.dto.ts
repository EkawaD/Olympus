import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class CreateTransactionDto {
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  payerId: number;

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  payees: User[];
}
