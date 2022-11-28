import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { SignupDto } from './dto/signup.dto';
import { DiscordUserDto } from 'src/users/dto/create-user.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwt: JwtService
  ) {}

  async signUp(userDto: SignupDto) {
    const hash = await argon.hash(userDto.password);
    try {
      const user = await this.userService.create({
        email: userDto.email,
        hash: hash,
      });
      return this.getToken(user);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async login(userDto: LoginDto) {
    const user = await this.userService.findByMail(userDto.email);
    if (!user) throw new ForbiddenException('Credentials incorrect');

    const pwMatch = await argon.verify(user.hash, userDto.password);
    if (!pwMatch) throw new ForbiddenException('Credentials incorrect');

    return this.getToken(user);
  }

  async addPassword(userId: number, userDto: SignupDto) {
    const hash = await argon.hash(userDto.password);
    const user = await this.userService.addPassword(userId, hash);
    delete user.hash;
    return { ...user, message: 'Password successfully added' };
  }

  async discordAuth(discordUser: DiscordUserDto) {
    const user = await this.userService.findByMail(discordUser.email);
    if (!user) return this.userService.createFromDiscord(discordUser);
    if (user.hash && !user.anon) {
      await this.userService.addAnon(user.id, discordUser);
    }
    delete user.anon;
    return user;
  }

  async getToken(user: { email: string; id: number }) {
    const payload = { email: user.email, sub: user.id };
    return {
      accessToken: this.jwt.sign(payload),
    };
  }
}
