import {
  Controller,
  ForbiddenException,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/group/me')
  async findUserGroup(@GetUser('id') userId: string) {
    const user = await this.usersService.findOne(+userId);
    const groups = await this.usersService.findAllGroup();

    const filteredGroups = groups.filter((g) =>
      g.anons.find((u) => u.id === user.anon.id)
    );
    filteredGroups.map((g) =>
      g.anons.map((a) => {
        delete a.id;
        delete a.userId;
      })
    );

    return filteredGroups;
  }

  @Get('/group/:name')
  async findGroup(@Param('name') name: string, @GetUser('id') userId: string) {
    if (!this.usersService.isUserInGroup(+userId, name))
      throw new ForbiddenException();
    const group = await this.usersService.findGroupByName(name);

    group.anons.map((a) => delete a.id);
    return group;
  }
}
