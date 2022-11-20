import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  create(createTransactionDto: CreateTransactionDto) {
    return this.prisma.transaction.create({
      data: {
        name: createTransactionDto.name,
        payerId: createTransactionDto.payerId,
        amount: createTransactionDto.amount,
        debts: {
          create: createTransactionDto.payees.map((p) => {
            return { userId: p.id };
          }),
        },
      },
    });
  }

  findAll() {
    return this.prisma.transaction.findMany({
      include: {
        debts: { include: { user: true } },
        payer: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.transaction.findUnique({
      where: { id },
      include: { debts: { include: { user: true } } },
    });
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return this.prisma.transaction.update({
      where: { id },
      data: updateTransactionDto,
    });
  }

  remove(id: number) {
    return this.prisma.transaction.delete({ where: { id } });
  }
}
