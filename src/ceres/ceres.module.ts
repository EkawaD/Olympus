import { Module } from '@nestjs/common';
import { CeresService } from './ceres.service';
import { CeresController } from './ceres.controller';
import { GroupModule } from 'src/group/group.module';

@Module({
  controllers: [CeresController],
  providers: [CeresService],
  imports: [GroupModule],
})
export class CeresModule {}
