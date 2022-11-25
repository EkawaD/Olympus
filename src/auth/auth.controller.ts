import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { DiscordAuthGuard, JwtAuthGuard } from './auth.guard';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @Post('login')
  // signup(@Body() dto: LoginDto) {
  //   return this.authService.login(dto);
  // }
  @Post('login')
  @UseGuards(JwtAuthGuard)
  async login(@Req() req) {
    return req.user;
  }

  @Get('discord')
  @UseGuards(DiscordAuthGuard)
  async getUserFromDiscordLogin(@Req() req, @Res() res): Promise<any> {
    const redirect = req.query.state;

    const { accessToken } = await this.authService.login(req.user);
    res
      .cookie('jwt', accessToken, {
        httpOnly: true,
        sameSite: 'lax',
      })
      .redirect(`${redirect}?accessToken=${accessToken}&userId=${req.user.id}`);
    // return accessToken;
    // res.
  }
}
