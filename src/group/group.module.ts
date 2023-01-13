import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [GroupController],
  providers: [GroupService],
  imports: [UsersModule],
  exports: [GroupService],
})
export class GroupModule {}
