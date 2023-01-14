import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DiscordUserDto, EmailUserDto } from './dto/user.dto';
import { UpdateAnonDto } from '../users/dto/anon.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService // private groupService: GroupService
  ) {}

  async addUserInGroup(userId: number, name: string) {
    const user = await this.findOne(userId);
    const group = await this.prisma.group.findUnique({
      where: { name },
      include: { anons: true },
    });
    return this.prisma.group.update({
      where: { name },
      data: {
        anons: {
          set: [...group.anons, user.anon],
        },
      },
    });
  }

  async createFromDiscord(userDto: DiscordUserDto) {
    const avatar =
      userDto.avatar === null
        ? 'https://cdn.discordapp.com/embed/avatars/0.png'
        : 'https://cdn.discordapp.com/avatars/' +
          userDto.id +
          '/' +
          userDto.avatar;

    const user = await this.prisma.user.create({
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
    await this.addUserInGroup(user.id, 'Galériens');
    return user;
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

  async findAnonProfil(id: number) {
    const anon = await this.prisma.anon.findUnique({ where: { userId: id } });
    delete anon.userId;
    return anon;
  }

  editAnonProfil(id: number, data: UpdateAnonDto) {
    return this.prisma.anon.update({
      where: { userId: id },
      data: data,
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
}
