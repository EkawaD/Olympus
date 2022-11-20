import { Transaction } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';

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
  payees: UserEntity[];
}
