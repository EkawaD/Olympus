import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AuthModule } from './auth/auth.module';
import { HermesModule } from './hermes/hermes.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    TransactionsModule,
    AuthModule,
    HermesModule,
  ],
})
export class AppModule {}
