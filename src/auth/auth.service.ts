import { ForbiddenException, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly userService: UsersService,
    private jwt: JwtService
  ) {}

  // async signup(dto: SignupDto) {
  //   const hash = await argon.hash(dto.password);

  //   try {
  //     const user = await this.prisma.user.create({
  //       data: {
  //         pseudo: dto.pseudo,
  //         email: dto.email,
  //         hash,
  //       },
  //     });
  //     delete user.hash;
  //     return user;
  //   } catch (error) {
  //     if (error instanceof PrismaClientKnownRequestError) {
  //       if (error.code === 'P2002') {
  //         throw new ForbiddenException('Credentials taken');
  //       }
  //     }
  //     throw error;
  //   }
  // }

  // async login(dto: LoginDto) {
  //   const user = await this.prisma.user.findUnique({
  //     where: { email: dto.email },
  //   });
  //   if (!user) throw new ForbiddenException('Credentials incorrect');

  //   const pwMatches = await argon.verify(user.hash, dto.password);
  //   if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
  //   delete user.hash;
  //   return user;
  // }

  async discordAuth(discordUser: CreateUserDto): Promise<any> {
    const user = await this.userService.findByMail(discordUser.email);

    if (!user) {
      return this.userService.create(discordUser);
    }

    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      accessToken: this.jwt.sign(payload),
    };
  }
}
