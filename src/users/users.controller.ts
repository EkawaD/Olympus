import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { GetUser } from './decorator/get-user.decorator';
import { GetBody } from './decorator/get-body.decorator';
import { UpdateAnonDto } from './dto/anon.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/anon/me')
  findAnonProfil(@GetUser('id') id: string) {
    return this.usersService.findAnonProfil(+id);
  }

  @Patch('/anon/me')
  updateAnon(@GetUser('id') userId: string, @GetBody() body: UpdateAnonDto) {
    return this.usersService.editAnonProfil(+userId, body);
  }
}
