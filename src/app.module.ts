import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HermesModule } from './hermes/hermes.module';
import { MidasModule } from './midas/midas.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    MidasModule,
    AuthModule,
    HermesModule,
    MidasModule,
  ],
})
export class AppModule {}
