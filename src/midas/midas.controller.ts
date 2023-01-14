import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Delete, Post } from '@nestjs/common/decorators';
import { GetBody } from 'src/users/decorator/get-body.decorator';
import { GroupGuard, JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { CreateTransactionDto } from './dto/transaction.dto';
import { MidasService } from './midas.service';
import { GroupService } from 'src/group/group.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Midas')
@UseGuards(JwtAuthGuard)
@Controller('midas')
export class MidasController {
  constructor(
    private readonly midasService: MidasService,
    private readonly groupService: GroupService
  ) {}

  @UseGuards(GroupGuard)
  @Post('/:name/transactions')
  async addTransaction(
    @Param('name') name: string,
    @GetBody() body: CreateTransactionDto
  ) {
    const group = await this.groupService.findByName(name);
    const transactions = await this.midasService.createTransaction(
      group.id,
      body
    );
    return transactions;
  }

  @UseGuards(GroupGuard)
  @Delete('/:name/transactions/:id')
  async deleteTransaction(@Param('id') id: string) {
    return await this.midasService.deleteTransaction(+id);
  }

  @UseGuards(GroupGuard)
  @Get('/:name/chart')
  async getChart(@Param('name') name: string) {
    return this.midasService.getChart(name);
  }

  @UseGuards(GroupGuard)
  @Get('/:name/advices')
  async getAdvice(@Param('name') name: string) {
    return this.midasService.getAdvices(name);
  }
}
