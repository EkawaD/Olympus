import { Transaction, User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class TransactionEntity implements Transaction {
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
