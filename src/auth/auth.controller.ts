import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { DiscordAuthGuard, JwtAuthGuard } from './guards/auth.guard';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { GetUser } from './decorator/get-user.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() userDto: LoginDto) {
    return this.authService.login(userDto);
  }

  @Post('signup')
  signUp(@Body() userDto: SignupDto) {
    return this.authService.signUp(userDto);
  }

  @Post('link')
  @UseGuards(JwtAuthGuard)
  linkAccount(@GetUser('id') id: string, @Body() userDto: SignupDto) {
    return this.authService.addPassword(+id, userDto);
  }

  @Get('discord')
  @UseGuards(DiscordAuthGuard)
  async getUserFromDiscordLogin(@Req() req, @Res() res: Response) {
    const redirect = req.query.state;
    const user = req.user;
    const { accessToken } = await this.authService.getToken(user);
    delete user.id;
    delete user.hash;
    if (!redirect) return res.send({ ...user, accessToken });

    return res.redirect(`${redirect}?accessToken=${accessToken}`);
  }
}
