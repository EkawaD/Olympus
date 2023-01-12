import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DiscordUserDto, EmailUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  createFromDiscord(userDto: DiscordUserDto) {
    const avatar =
      userDto.avatar === null
        ? 'https://cdn.discordapp.com/embed/avatars/0.png'
        : 'https://cdn.discordapp.com/avatars/' +
          userDto.id +
          '/' +
          userDto.avatar;

    return this.prisma.user.create({
      data: {
        email: userDto.email,
        anon: {
          create: {
            pseudo: userDto.username,
            avatar: avatar,
          },
        },
        profil: {
          create: {},
        },
      },
    });
  }

  create(userDto: EmailUserDto) {
    return this.prisma.user.create({
      data: {
        email: userDto.email,
        hash: userDto.hash,
        anon: {
          create: {},
        },
        profil: {
          create: {},
        },
      },
    });
  }

  addAnon(id: number, userDto: DiscordUserDto) {
    const avatar = userDto.avatar === null ? '/avatar.png' : userDto.avatar;
    return this.prisma.user.update({
      where: { id },
      data: {
        anon: {
          create: {
            avatar: avatar,
            pseudo: userDto.username,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { anon: { include: { groups: true } } },
    });
  }

  findByMail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { anon: true },
    });
  }

  addPassword(id: number, hash: string) {
    return this.prisma.user.update({
      where: { id },
      data: {
        hash,
      },
    });
  }

  async isUserInGroup(userId: number, groupName: string) {
    const group = await this.findGroupByName(groupName);

    if (!group) throw new NotFoundException();
    const user = await this.findOne(+userId);

    if (!group.anons.find((u) => u.id === user.anon.id)) return false;
    return true;
  }

  findGroupByName(name: string) {
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

  findAllGroup() {
    return this.prisma.group.findMany({
      include: {
        anons: true,
        transactions: true,
        todos: { include: { todos: true } },
      },
    });
  }
}
