import { Module } from '@nestjs/common';
import { HeraclesService } from './heracles.service';
import { HeraclesController } from './heracles.controller';
import { GroupModule } from 'src/group/group.module';

@Module({
  controllers: [HeraclesController],
  providers: [HeraclesService],
  imports: [GroupModule],
})
export class HeraclesModule {}
