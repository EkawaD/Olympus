import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { domainToASCII } from 'url';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService {
  constructor(
    private prisma: PrismaService,
    private userService: UsersService
  ) {}
  async create(createGroupDto: CreateGroupDto, userId: number) {
    const user = await this.userService.findOne(userId);
    const group = await this.prisma.group.create({
      data: {
        name: createGroupDto.name,
      },
    });
    return this.prisma.group.update({
      where: { id: group.id },
      data: {
        anons: {
          set: [user.anon],
        },
      },
    });
  }

  findAll() {
    return `This action returns all group`;
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
