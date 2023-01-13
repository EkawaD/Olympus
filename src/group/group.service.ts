import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CreateGroupDto, UpdateGroupDto } from './dto/group.dto';

@Injectable()
export class GroupService {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService
  ) {}

  async isUserInGroup(userId: number, groupName: string) {
    const group = await this.findByName(groupName);

    if (!group) throw new NotFoundException();
    const user = await this.usersService.findOne(+userId);

    if (!group.anons.find((u) => u.id === user.anon.id)) return false;
    return true;
  }

  async findUserGroups(userId: number) {
    const user = await this.usersService.findOne(+userId);
    const groups = await this.findAll();

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

  findByName(name: string) {
    return this.prisma.group.findUnique({
      where: { name },
      include: {
        anons: {
          select: {
            id: true,
            pseudo: true,
            avatar: true,
          },
        },
        transactions: true,
        todos: { include: { todos: true } },
      },
    });
  }

  findAll() {
    return this.prisma.group.findMany({
      include: {
        anons: true,
        transactions: true,
        todos: { include: { todos: true } },
      },
    });
  }

  async create(dto: CreateGroupDto, userId: number) {
    const anon = await this.usersService.findAnonProfil(userId);
    const group = await this.prisma.group.create({
      data: {
        name: dto.name,
      },
    });
    return this.prisma.group.update({
      where: { id: group.id },
      data: {
        anons: {
          set: [anon],
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.group.findUnique({
      where: { id },
      include: {
        anons: {
          select: {
            id: true,
            pseudo: true,
            avatar: true,
          },
        },
        transactions: true,
        todos: { include: { todos: true } },
      },
    });
  }

  update(id: number, dto: UpdateGroupDto) {
    return this.prisma.group.update({
      where: { id: id },
      data: {
        name: dto.name,
      },
    });
  }

  async unsubscribeFromGroup(userId: number, name: string) {
    const group = await this.findByName(name);
    const anon = await this.usersService.findAnonProfil(userId);
    const newAnonArray = group.anons.filter((a) => a.id !== anon.id);
    return this.prisma.group.update({
      where: { id: group.id },
      data: {
        anons: {
          set: newAnonArray,
        },
      },
    });
  }
}
