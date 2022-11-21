import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: createUserDto,
      include: { profil: true },
    });
    await this.prisma.profil.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
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
