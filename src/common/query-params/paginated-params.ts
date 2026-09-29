import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsOptional, IsInt, Min } from 'class-validator'

export class PaginatedParamsDto {
  @ApiPropertyOptional({
    description: 'Cantidad de resultados por página',
    example: 25,
    default: 25,
  })
  @IsOptional()
  @IsInt()
  @Min(1, { message: 'El tamaño de pagina debe ser al menos 1' })
  @Transform(({ value }) => (value ? parseInt(value, 10) : 25))
  page_size: number = 25

  @ApiPropertyOptional({
    description: 'Número de página',
    example: 1,
    default: 1,
  })
  @IsInt()
  @IsOptional()
  @Min(1, { message: 'La número de pagina debe ser al menos 1' })
  @Transform(({ value }) => (value ? parseInt(value, 10) : 1))
  page: number = 1
}
