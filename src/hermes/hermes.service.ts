import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

  async findEkawaCv() {
    const user = await this.prisma.user.findUnique({
      where: { email: 'steo.ederhy@gmail.com' },
      include: { profil: true },
    });
    return this.findPublicProfil(user.id);
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
