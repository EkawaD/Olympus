import {
  Controller,
  Get,
  Param,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { Delete, Post } from '@nestjs/common/decorators';
import { GetBody } from 'src/auth/decorator/get-body.decorator';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { UsersService } from 'src/users/users.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

import { MidasService } from './midas.service';

@Controller('midas')
export class MidasController {
  constructor(
    private readonly midasService: MidasService,
    private readonly usersService: UsersService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/group/me')
  async findUserGroup(@GetUser('id') userId: string) {
    const user = await this.usersService.findOne(+userId);
    const groups = await this.midasService.findAllGroup();
    const g = groups.find((g) => g.anons.find((u) => u.id === user.anon.id));

    g.anons.map((a) => {
      delete a.id;
      delete a.userId;
      delete a.groupId;
    });
    return g;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/group/:name')
  async findGroup(@Param('name') name: string, @GetUser('id') userId: string) {
    if (!this.midasService.isUserInGroup(+userId, name))
      throw new ForbiddenException();
    const group = await this.midasService.findGroupByName(name);

    group.anons.map((a) => delete a.id);
    return group;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:name/transactions')
  async addTransaction(
    @Param('name') name: string,
    @GetUser('id') userId: string,
    @GetBody() body: CreateTransactionDto
  ) {
    if (!this.midasService.isUserInGroup(+userId, name))
      throw new ForbiddenException();
    const group = await this.midasService.findGroupByName(name);

    const transactions = await this.midasService.createTransaction(
      group.id,
      body
    );

    return transactions;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:name/transactions/:id')
  async deleteTransaction(
    @Param('name') name: string,
    @Param('id') id: string,
    @GetUser('id') userId: string
  ) {
    if (!this.midasService.isUserInGroup(+userId, name))
      throw new ForbiddenException();
    return await this.midasService.deleteTransaction(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:name/chart')
  async getChart(@Param('name') name: string, @GetUser('id') userId: string) {
    if (!this.midasService.isUserInGroup(+userId, name))
      throw new ForbiddenException();
    return this.midasService.getChart(name);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:name/advices')
  async getAdvice(@Param('name') name: string, @GetUser('id') userId: string) {
    if (!this.midasService.isUserInGroup(+userId, name))
      throw new ForbiddenException();
    return this.midasService.getAdvices(name);
  }
}
