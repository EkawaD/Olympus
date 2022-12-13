import {
  Controller,
  Post,
  Param,
  Delete,
  ForbiddenException,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { HeraclesService } from './heracles.service';
import { CategoryDto } from './dto/category.dto';
import { UsersService } from 'src/users/users.service';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { GetBody } from 'src/auth/decorator/get-body.decorator';
import { TodoDto } from './dto/todo.dto';

@UseGuards(JwtAuthGuard)
@Controller('heracles')
export class HeraclesController {
  constructor(
    private readonly heraclesService: HeraclesService,
    private readonly usersService: UsersService
  ) {}

  @Post('/:name/category')
  async createCategory(
    @Param('name') name: string,
    @GetUser('id') userId: string,
    @GetBody() dto: CategoryDto
  ) {
    if (!this.usersService.isUserInGroup(+userId, name))
      throw new ForbiddenException();
    const group = await this.usersService.findGroupByName(name);

    return this.heraclesService.createCategory(dto, group.id);
  }

  @Post('/:name/todo')
  async createTodo(
    @Param('name') name: string,
    @GetUser('id') userId: string,
    @GetBody() dto: TodoDto
  ) {
    if (!this.usersService.isUserInGroup(+userId, name))
      throw new ForbiddenException();

    return this.heraclesService.createTodo(dto);
  }

  @Patch('/:name/todo/:id')
  async updateTodo(
    @Param('name') name: string,
    @Param('id') id: string,
    @GetUser('id') userId: string,
    @GetBody() dto: TodoDto
  ) {
    if (!this.usersService.isUserInGroup(+userId, name))
      throw new ForbiddenException();

    return this.heraclesService.updateTodo(+id, dto);
  }

  @Delete('/:name/category/:id')
  async remove(
    @Param('id') id: string,
    @Param('name') name: string,
    @GetUser('id') userId: string
  ) {
    if (!this.usersService.isUserInGroup(+userId, name))
      throw new ForbiddenException();

    return this.heraclesService.removeCategory(+id);
  }
}
