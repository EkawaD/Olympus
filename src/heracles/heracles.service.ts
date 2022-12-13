import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CategoryDto } from './dto/category.dto';
import { TodoDto } from './dto/todo.dto';

@Injectable()
export class HeraclesService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService
  ) {}

  createCategory(dto: CategoryDto, groupId: number) {
    return this.prisma.categoryTodo.create({
      data: {
        name: dto.name,
        groupId: groupId,
      },
      include: { todos: true },
    });
  }

  createTodo(dto: TodoDto) {
    return this.prisma.todo.create({
      data: {
        task: dto.task,
        categoryTodoId: dto.categoryId,
      },
    });
  }

  updateTodo(id: number, dto: TodoDto) {
    return this.prisma.todo.update({
      where: { id },
      data: dto,
    });
  }

  removeCategory(id: number) {
    return this.prisma.categoryTodo.delete({ where: { id } });
  }
}
