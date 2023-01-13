import {
  Controller,
  Get,
  Param,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { Delete, Post } from '@nestjs/common/decorators';
import { GetBody } from 'src/users/decorator/get-body.decorator';
import { GetUser } from 'src/users/decorator/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { CreateTransactionDto } from './dto/transaction.dto';

import { MidasService } from './midas.service';
import { GroupService } from 'src/group/group.service';

@UseGuards(JwtAuthGuard)
@Controller('midas')
export class MidasController {
  constructor(
    private readonly midasService: MidasService,
    private readonly groupService: GroupService
  ) {}

  @Post('/:name/transactions')
  async addTransaction(
    @Param('name') name: string,
    @GetUser('id') userId: string,
    @GetBody() body: CreateTransactionDto
  ) {
    if (!this.groupService.isUserInGroup(+userId, name))
      throw new ForbiddenException();
    const group = await this.groupService.findByName(name);

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
    if (!this.groupService.isUserInGroup(+userId, name))
      throw new ForbiddenException();
    return await this.midasService.deleteTransaction(+id);
  }

  @Get('/:name/chart')
  async getChart(@Param('name') name: string, @GetUser('id') userId: string) {
    if (!this.groupService.isUserInGroup(+userId, name))
      throw new ForbiddenException();
    return this.midasService.getChart(name);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:name/advices')
  async getAdvice(@Param('name') name: string, @GetUser('id') userId: string) {
    if (!this.groupService.isUserInGroup(+userId, name))
      throw new ForbiddenException();
    return this.midasService.getAdvices(name);
  }
}
