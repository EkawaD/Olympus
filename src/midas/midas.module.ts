import { Module } from '@nestjs/common';
import { MidasService } from './midas.service';
import { MidasController } from './midas.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [MidasController],
  providers: [MidasService],
  imports: [UsersModule],
})
export class MidasModule {}
