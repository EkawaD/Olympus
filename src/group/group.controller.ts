import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/group.dto';
import { UpdateGroupDto } from './dto/group.dto';
import { GetUser } from 'src/users/decorator/get-user.decorator';
import { GroupGuard, JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Group')
@UseGuards(JwtAuthGuard)
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get('/me')
  async findUserGroups(@GetUser('id') userId: string) {
    return this.groupService.findUserGroups(+userId);
  }

  @UseGuards(GroupGuard)
  @Get('/:name')
  async findGroup(@Param('name') name: string) {
    const group = await this.groupService.findByName(name);
    group.anons.map((a) => delete a.id);
    return group;
  }

  @Post()
  create(@GetUser('id') userId: string, @Body() dto: CreateGroupDto) {
    return this.groupService.create(dto, +userId);
  }

  @UseGuards(GroupGuard)
  @Patch(':name')
  update(@Param('name') name: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(name, updateGroupDto);
  }

  @UseGuards(GroupGuard)
  @Delete(':name')
  unsubscribe(@Param('name') name: string, @GetUser('id') userId: string) {
    return this.groupService.unsubscribeFromGroup(+userId, name);
  }
}
