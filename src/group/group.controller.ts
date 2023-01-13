import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/group.dto';
import { UpdateGroupDto } from './dto/group.dto';
import { GetUser } from 'src/users/decorator/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get('/me')
  async findUserGroups(@GetUser('id') userId: string) {
    return this.groupService.findUserGroups(+userId);
  }

  @Get('/:name')
  async findGroup(@Param('name') name: string, @GetUser('id') userId: string) {
    if (!this.groupService.isUserInGroup(+userId, name))
      throw new ForbiddenException();
    const group = await this.groupService.findByName(name);

    group.anons.map((a) => delete a.id);
    return group;
  }

  @Post()
  create(@GetUser('id') userId: string, @Body() dto: CreateGroupDto) {
    return this.groupService.create(dto, +userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @Delete(':name')
  unsubscribe(@Param('name') name: string, @GetUser('id') userId: string) {
    if (!this.groupService.isUserInGroup(+userId, name))
      throw new ForbiddenException();
    return this.groupService.unsubscribeFromGroup(+userId, name);
  }
}
