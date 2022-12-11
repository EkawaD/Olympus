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

@UseGuards(JwtAuthGuard)
@Controller('midas')
export class MidasController {
  constructor(
    private readonly midasService: MidasService,
    private readonly usersService: UsersService
  ) {}

  @Post('/:name/transactions')
  async addTransaction(
    @Param('name') name: string,
    @GetUser('id') userId: string,
    @GetBody() body: CreateTransactionDto
  ) {
    if (!this.usersService.isUserInGroup(+userId, name))
      throw new ForbiddenException();
    const group = await this.usersService.findGroupByName(name);

    const transactions = await this.midasService.createTransaction(
      group.id,
      body
    );

    return transactions;
  }

  @Delete('/:name/transactions/:id')
  async deleteTransaction(
    @Param('name') name: string,
    @Param('id') id: string,
    @GetUser('id') userId: string
  ) {
    if (!this.usersService.isUserInGroup(+userId, name))
      throw new ForbiddenException();
    return await this.midasService.deleteTransaction(+id);
  }

  @Get('/:name/chart')
  async getChart(@Param('name') name: string, @GetUser('id') userId: string) {
    if (!this.usersService.isUserInGroup(+userId, name))
      throw new ForbiddenException();
    return this.midasService.getChart(name);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:name/advices')
  async getAdvice(@Param('name') name: string, @GetUser('id') userId: string) {
    if (!this.usersService.isUserInGroup(+userId, name))
      throw new ForbiddenException();
    return this.midasService.getAdvices(name);
  }
}
