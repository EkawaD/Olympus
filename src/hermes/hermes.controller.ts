import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { HermesService } from './hermes.service';

import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { GetUser } from 'src/users/decorator/get-user.decorator';

import { GetBody } from 'src/users/decorator/get-body.decorator';
import { UpdateProfilDto } from './dto/profil.dto';
import { CVDto } from './dto/cv.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('hermes')
@ApiTags('Hermes')
export class HermesController {
  constructor(private readonly hermesService: HermesService) {}

  @Get('/cv/ekawa')
  findEkawaCV() {
    return this.hermesService.findEkawaCv();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/cv/me')
  findPublicProfil(@GetUser('id') id: string) {
    return this.hermesService.findPublicProfil(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/cv/me')
  updateProfil(
    @GetBody() body: UpdateProfilDto,
    @GetUser('id') userId: string
  ) {
    return this.hermesService.editProfil(+userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/cv/:table')
  async addToCV(
    @Param('table') table: string,
    @GetUser('id') userId: string,
    @GetBody() body: CVDto
  ) {
    const { id } = await this.hermesService.findProfil(+userId);
    const data = { ...body, profilId: id };
    return this.hermesService.addToCV(table, data);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/cv/:table/:id')
  async updateCV(
    @Param('id') id: string,
    @Param('table') table: string,
    @GetUser('id') userId: string,
    @GetBody() body: CVDto
  ) {
    const isAllowed = await this.hermesService.allowedOperation(
      table,
      +id,
      +userId
    );

    if (!isAllowed) throw new UnauthorizedException();
    return this.hermesService.updateCV(table, +id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/cv/:table/:id')
  async deleteFromCV(
    @Param('id') id: string,
    @Param('table') table: string,
    @GetUser('id') userId: string
  ) {
    const isAllowed = await this.hermesService.allowedOperation(
      table,
      +id,
      +userId
    );
    if (!isAllowed) throw new UnauthorizedException();
    return this.hermesService.deleteFromCV(table, +id);
  }
}
