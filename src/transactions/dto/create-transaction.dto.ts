import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';

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
  payees: UserEntity[];
}
