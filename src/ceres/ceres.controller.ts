import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GroupGuard, JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { CeresService } from './ceres.service';
import { ProductDto, UpdateProductDto } from './dto/product.dto';
import { RecipeDto, UpdateRecipeDto } from './dto/recipe.dto';

@Controller('ceres')
@UseGuards(JwtAuthGuard)
export class CeresController {
  constructor(private readonly ceresService: CeresService) {}

  @Get(':name')
  @UseGuards(GroupGuard)
  findAll(@Param('name') name: string) {
    return this.ceresService.findAll(name);
  }

  @Post(':name/recipe')
  @UseGuards(GroupGuard)
  create(@Body() dto: RecipeDto, @Param('name') name: string) {
    return this.ceresService.create(dto, name);
  }

  @Get(':name/recipe/:id')
  @UseGuards(GroupGuard)
  findOne(@Param('id') id: string) {
    return this.ceresService.findOne(+id);
  }

  @Patch(':name/recipe/:id')
  @UseGuards(GroupGuard)
  update(@Param('id') id: string, @Body() dto: UpdateRecipeDto) {
    return this.ceresService.update(+id, dto);
  }

  @Delete(':name/recipe/:id')
  @UseGuards(GroupGuard)
  remove(@Param('id') id: string) {
    return this.ceresService.remove(+id);
  }

  @Post(':name/product')
  @UseGuards(GroupGuard)
  createProduct(@Body() dto: ProductDto, @Param('name') name: string) {
    return this.ceresService.createProduct(dto, name);
  }

  @Get(':name/product/:id')
  @UseGuards(GroupGuard)
  findOneProduct(@Param('id') id: string) {
    return this.ceresService.findOneProduct(+id);
  }

  @Patch(':name/product/:id')
  @UseGuards(GroupGuard)
  updateProduct(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.ceresService.updateProduct(+id, dto);
  }

  @Delete(':name/product/:id')
  @UseGuards(GroupGuard)
  removeProduct(@Param('id') id: string) {
    return this.ceresService.removeProduct(+id);
  }
}
