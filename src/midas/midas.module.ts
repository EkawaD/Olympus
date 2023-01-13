import { Module } from '@nestjs/common';
import { MidasService } from './midas.service';
import { MidasController } from './midas.controller';
import { GroupModule } from 'src/group/group.module';

@Module({
  controllers: [MidasController],
  providers: [MidasService],
  imports: [GroupModule],
})
export class MidasModule {}
