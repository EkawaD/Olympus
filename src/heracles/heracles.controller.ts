import {
  Controller,
  Post,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { HeraclesService } from './heracles.service';
import { CategoryDto } from './dto/category.dto';
import { GroupGuard, JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { GetBody } from 'src/users/decorator/get-body.decorator';
import { TodoDto } from './dto/todo.dto';
import { GroupService } from 'src/group/group.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Heracles')
@UseGuards(JwtAuthGuard)
@UseGuards(GroupGuard)
@Controller('heracles')
export class HeraclesController {
  constructor(
    private readonly heraclesService: HeraclesService,
    private readonly groupService: GroupService
  ) {}

  @Post('/:name/category')
  async createCategory(
    @Param('name') name: string,
    @GetBody() dto: CategoryDto
  ) {
    const group = await this.groupService.findByName(name);
    return this.heraclesService.createCategory(dto, group.id);
  }

  @Post('/:name/todo')
  async createTodo(@GetBody() dto: TodoDto) {
    return this.heraclesService.createTodo(dto);
  }

  @Patch('/:name/todo/:id')
  async updateTodo(@Param('id') id: string, @GetBody() dto: TodoDto) {
    return this.heraclesService.updateTodo(+id, dto);
  }

  @Delete('/:name/todo/:id')
  async deleteTodo(@Param('id') id: string) {
    return this.heraclesService.deleteTodo(+id);
  }

  @Delete('/:name/category/:id')
  async remove(@Param('id') id: string) {
    return this.heraclesService.removeCategory(+id);
  }
}
