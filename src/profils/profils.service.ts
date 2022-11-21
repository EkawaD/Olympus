import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddCareerToProfilDto } from './dto/add-career-profil.dto';
import { UpdateProfilDto } from './dto/update-profil.dto';

@Injectable()
export class ProfilsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.profil.findMany({
      include: {
        lettres: true,
        refs: true,
        diplomes: true,
        experiences: true,
        projects: true,
        skills: true,
        hobbies: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.profil.findUnique({
      where: { id },
      include: {
        lettres: true,
        refs: true,
        diplomes: true,
        experiences: true,
        projects: true,
        skills: true,
        hobbies: true,
      },
    });
  }

  update(id: number, updateProfilDto: UpdateProfilDto) {
    return this.prisma.profil.update({
      where: { id },
      data: updateProfilDto,
      include: {
        lettres: true,
        refs: true,
        diplomes: true,
        experiences: true,
        projects: true,
        skills: true,
        hobbies: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.profil.delete({ where: { id } });
  }

  addCareer(table: string, addCareerDto: AddCareerToProfilDto) {
    return this.prisma[table].create({
      data: addCareerDto,
    });
  }

  updateCareer(table: string, id: number, addCareerDto: AddCareerToProfilDto) {
    return this.prisma[table].update({
      where: { id: id },
      data: addCareerDto,
    });
  }

  deleteCareer(table: string, id: number) {
    return this.prisma[table].delete({
      where: { id: id },
    });
  }
}
