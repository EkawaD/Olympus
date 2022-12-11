import { Module } from '@nestjs/common';
import { HeraclesService } from './heracles.service';
import { HeraclesController } from './heracles.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [HeraclesController],
  providers: [HeraclesService],
  imports: [UsersModule],
})
export class HeraclesModule {}
