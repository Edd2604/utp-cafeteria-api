import { SearchQueryParamsDto } from '@common/query-params/search-query-params'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { Categoria } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsEnum, IsNumber, IsOptional } from 'class-validator'

enum OrderProducts {
  asc = 'asc',
  desc = 'desc',
}
export class ProductsQueryParams extends SearchQueryParamsDto {
  @ApiPropertyOptional({
    enum: Categoria,
    default: '',
    description: 'Categoria de productos',
  })
  @IsEnum(Categoria)
  @IsOptional()
  category: string

  @ApiPropertyOptional({
    description: 'Precio máximo de productos',
    type: 'number',
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  max_price: number

  @ApiPropertyOptional({
    enum: OrderProducts,
    default: '',
    description: 'Orden de productos por precio',
  })
  @IsEnum(OrderProducts)
  @IsOptional()
  order: OrderProducts
}
