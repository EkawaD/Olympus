import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  toBuy: number;
}
export class UpdateProductDto extends PartialType(ProductDto) {}
