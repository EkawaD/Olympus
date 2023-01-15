import { Injectable } from '@nestjs/common';
import { GroupService } from 'src/group/group.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto, UpdateProductDto } from './dto/product.dto';
import { RecipeDto, UpdateRecipeDto } from './dto/recipe.dto';

@Injectable()
export class CeresService {
  constructor(
    private readonly prisma: PrismaService,
    private groupService: GroupService
  ) {}

  async create(dto: RecipeDto, name: string) {
    const group = await this.groupService.findByName(name);
    console.log(dto);

    return this.prisma.recipe.create({
      data: {
        groupId: group.id,
        name: dto.name,
        tasks: dto.tasks,
        time: dto.time,
        hint: dto.hint,
        servings: dto.servings ? +dto.servings : undefined,
        image: dto.image,
        meal: dto.meal,
        ingredients: {
          createMany: {
            data: dto.ingredients,
          },
        },
      },
      include: {
        ingredients: {
          select: {
            product: {
              select: { name: true, id: true, stock: true, toBuy: true },
            },
            needed: true,
          },
        },
      },
    });
  }

  async findAll(name: string) {
    const group = await this.groupService.findByName(name);
    return {
      id: group.id,
      name: group.name,
      products: group.products,
      recipes: group.recipes,
    };
  }

  findOne(id: number) {
    return this.prisma.recipe.findUnique({ where: { id } });
  }

  async update(id: number, dto: UpdateRecipeDto) {
    await this.prisma.ingredient.deleteMany({
      where: { recipeId: id },
    });
    await this.prisma.ingredient.createMany({
      data: dto.ingredients.map((i) => ({ ...i, recipeId: id })),
    });
    const ingredients = await this.prisma.ingredient.findMany({
      where: { recipeId: id },
    });

    console.log(ingredients);
    return this.prisma.recipe.update({
      where: { id },
      data: {
        ...dto,
        ingredients: {
          set: ingredients.map((i) => ({ id: i.id })),
        },
      },
      include: {
        ingredients: {
          select: {
            product: {
              select: { name: true, id: true, stock: true, toBuy: true },
            },
            needed: true,
          },
        },
      },
    });
  }

  remove(id: number) {
    return this.prisma.recipe.delete({ where: { id } });
  }

  async createProduct(dto: ProductDto, name: string) {
    const group = await this.groupService.findByName(name);
    return this.prisma.product.create({
      data: {
        ...dto,
        groupId: group.id,
      },
    });
  }

  findOneProduct(id: number) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  updateProduct(id: number, dto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: dto,
    });
  }

  removeProduct(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
