import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateAnonDto } from './dto/anon.dto';
import { CVDto } from './dto/cv.dto';
import { UpdateProfilDto } from './dto/profil.dto';

@Injectable()
export class HermesService {
  constructor(private prisma: PrismaService) {}

  async allowedOperation(table: string, id: number, userId: number) {
    const profil = await this.findProfil(userId);
    const data = await this.prisma[table].findUnique({ where: { id } });

    if (!data || data.profilId !== profil.id) return false;
    return true;
  }

  findProfil(id: number) {
    return this.prisma.profil.findUnique({
      where: { userId: id },
    });
  }

  editProfil(id: number, data: UpdateProfilDto) {
    return this.prisma.profil.update({
      where: { userId: id },
      data,
    });
  }

  findPublicProfil(id: number) {
    return this.prisma.profil.findUnique({
      where: { userId: id },
      include: {
        lettres: true,
        refs: true,
        experiences: true,
        diplomes: true,
        projects: true,
        skills: true,
        hobbies: true,
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

  addToCV(table: string, data: CVDto) {
    return this.prisma[table].create({
      data: data,
    });
  }

  updateCV(table: string, id: number, data: CVDto) {
    return this.prisma[table].update({
      where: { id: id },
      data: data,
    });
  }

  deleteFromCV(table: string, id: number) {
    return this.prisma[table].delete({
      where: { id: id },
    });
  }
}
