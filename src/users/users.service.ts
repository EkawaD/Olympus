import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const img =
      createUserDto.avatar === null
        ? 'https://cdn.discordapp.com/embed/avatars/0.png'
        : 'https://cdn.discordapp.com/avatars/' +
          createUserDto.id +
          '/' +
          createUserDto.avatar;
    const user = await this.prisma.user.create({
      data: {
        pseudo: createUserDto.username,
        email: createUserDto.email,
        discordId: createUserDto.id,
        image: img,
        accessToken: createUserDto.accessToken,
        refreshToken: createUserDto.refreshToken,
      },
    });
    return user;
  }

  findAll() {
    return this.prisma.user.findMany({ include: { profil: true } });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        profil: {
          include: {
            lettres: true,
            refs: true,
            diplomes: true,
            experiences: true,
            projects: true,
            skills: true,
            hobbies: true,
          },
        },
      },
    });
  }

  findByMail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  appendToken(discordUser: CreateUserDto) {
    return this.prisma.user.update({
      where: { discordId: discordUser.id },
      data: {
        accessToken: discordUser.accessToken,
        refreshToken: discordUser.refreshToken,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      include: { profil: true },
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
      include: { profil: true },
    });
  }
}
