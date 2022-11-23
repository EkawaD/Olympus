import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProfilsService } from './profils.service';
import { UpdateProfilDto } from './dto/update-profil.dto';
import { ProfilEntity } from './entities/profil.entity';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AddCareerToProfilDto } from './dto/add-career-profil.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Profils')
@Controller('profils')
export class ProfilsController {
  constructor(private readonly profilsService: ProfilsService) {}

  @Get()
  @UseGuards(AuthGuard('discord'))
  @ApiOkResponse({ type: ProfilEntity, isArray: true })
  findAll() {
    return this.profilsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ProfilEntity })
  findOne(@Param('id') id: string) {
    return this.profilsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ProfilEntity })
  update(@Param('id') id: string, @Body() updateProfilDto: UpdateProfilDto) {
    return this.profilsService.update(+id, updateProfilDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ProfilEntity })
  remove(@Param('id') id: string) {
    return this.profilsService.remove(+id);
  }

  @Post('/cv/:table')
  @ApiOkResponse({ type: ProfilEntity })
  updateCareer(
    @Param('table') table: string,
    @Body() addCareerDto: AddCareerToProfilDto
  ) {
    return this.profilsService.addCareer(table, addCareerDto);
  }

  @Patch('/cv/:table/:id')
  @ApiOkResponse({ type: ProfilEntity })
  postCareer(
    @Param('id') id: string,
    @Param('table') table: string,
    @Body() addCareerDto: AddCareerToProfilDto
  ) {
    return this.profilsService.updateCareer(table, +id, addCareerDto);
  }

  @Delete('/cv/:table/:id')
  @ApiOkResponse({ type: ProfilEntity })
  rmCareer(@Param('id') id: string, @Param('table') table: string) {
    return this.profilsService.deleteCareer(table, +id);
  }
}
