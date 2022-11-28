import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { DiscordStrategy } from './guards/discord.strategy';
import { JwtAuthStrategy } from './guards/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    HttpModule,
    JwtModule.register({
      signOptions: { expiresIn: '59m' },
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [AuthService, DiscordStrategy, JwtAuthStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
