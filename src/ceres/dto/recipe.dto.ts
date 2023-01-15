import { PartialType } from '@nestjs/mapped-types';
import { Ingredient, Meal } from '@prisma/client';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class RecipeDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  tasks: string;

  @IsNotEmpty()
  time: string;

  @IsNotEmpty()
  hint: string;

  @IsOptional()
  servings: number;

  @IsOptional()
  image: string;

  @IsOptional()
  meal: Meal;

  @IsNotEmpty()
  ingredients: Ingredient[];
}
export class UpdateRecipeDto extends PartialType(RecipeDto) {}
