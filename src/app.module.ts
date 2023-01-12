import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HermesModule } from './hermes/hermes.module';
import { MidasModule } from './midas/midas.module';
import { HeraclesModule } from './heracles/heracles.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    MidasModule,
    AuthModule,
    HermesModule,
    MidasModule,
    HeraclesModule,
    GroupModule,
  ],
})
export class AppModule {}
