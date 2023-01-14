import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class DiscordAuthGuard extends AuthGuard('discord') {}

@Injectable()
export class GroupGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const groupName = req.params.name;
    const user = req.user;
    if (user.anon.groups.map((g) => g.name).includes(groupName)) {
      return true;
    }
    return false;
  }
}
