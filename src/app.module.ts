import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { ProfilsModule } from './profils/profils.module';

@Module({
  imports: [PrismaModule, UsersModule, TransactionsModule, ProfilsModule],
})
export class AppModule {}
