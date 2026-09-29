import { BadRequestException } from '@nestjs/common'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsOptional } from 'class-validator'
import { isValid, parse } from 'date-fns'

import { PaginatedParamsDto } from './paginated-params'

export class RangeDateQueryParams extends PaginatedParamsDto {
  @ApiPropertyOptional({
    description: 'Rango inicial de fechas',
    format: 'yyyy-MM-dd',
    type: 'string',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return null
    if (value instanceof Date) return value
    const date = parse(value, 'yyyy-MM-dd', new Date())

    if (!isValid(date)) {
      throw new BadRequestException(
        `El parámetro de fecha inicial no es una fecha válida. Usa el formato yyyy-MM-dd.`,
      )
    }

    return date
  })
  start_date?: string

  @ApiPropertyOptional({
    description: 'Rango Final de fechas',
    format: 'yyyy-MM-dd',
    type: 'string',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return null
    if (value instanceof Date) return value
    const date = parse(value, 'yyyy-MM-dd', new Date())

    if (!isValid(date)) {
      throw new BadRequestException(
        `El parámetro fecha final no es una fecha válida. Usa el formato yyyy-MM-dd.`,
      )
    }

    return date
  })
  end_date?: string
}
