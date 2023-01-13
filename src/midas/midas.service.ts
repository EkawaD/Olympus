import { Injectable } from '@nestjs/common';
import { Transaction } from '@prisma/client';
import { GroupService } from 'src/group/group.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from './dto/transaction.dto';

@Injectable()
export class MidasService {
  constructor(
    private prisma: PrismaService,
    private groupService: GroupService
  ) {}

  groupBy(
    xs: any[],
    key: string,
    red = (acc: any, curr: any) => [...acc, curr],
    init = 0
  ) {
    return xs.reduce(function (
      rv: { [x: string]: never[] },
      curr: { [x: string]: any }
    ) {
      const acc = rv[curr[key]] || init;
      return { ...rv, [curr[key]]: red(acc, curr) };
    },
    {});
  }

  createTransaction(id: number, dto: CreateTransactionDto) {
    return this.prisma.transaction.create({
      data: {
        name: dto.name,
        payer: dto.payer,
        amount: +dto.amount,
        payee: dto.payee,
        groupId: id,
      },
    });
  }

  deleteTransaction(id: number) {
    return this.prisma.transaction.delete({
      where: { id },
    });
  }

  async getChart(groupName: string) {
    const group = await this.groupService.findByName(groupName);
    const transactions = group.transactions;
    const sumOfAmount = (total: any, t: Transaction) => total + t.amount;
    const payer = Object.entries(
      this.groupBy(transactions, 'payer', sumOfAmount)
    );
    const payee = Object.entries(
      this.groupBy(transactions, 'payee', sumOfAmount)
    ).map((a: any[]) => [a[0], a[1] * -1]);
    const allTransactions = payer.concat(payee as []).map((item: any) => {
      return { name: item[0], amount: Number(item[1].toFixed(2)) };
    });
    return Object.entries(this.groupBy(allTransactions, 'name', sumOfAmount));
  }

  async getAdvices(groupName: string) {
    const chart = await this.getChart(groupName);
    const dPayer = chart.filter((c: any[]) => c[1] > 0);
    const dPayee = chart.filter((c: any[]) => c[1] < 0);
    const refoundAdvice = dPayer.map((p) =>
      dPayee.map((u) => {
        return { creditor: p[0], debitor: u[0], amount: +u[1] * -1 };
      })
    );

    return refoundAdvice[0] || [];
  }
}
