import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsBoolean } from 'class-validator'
import { Transform } from 'class-transformer'

import { PaginatedParamsDto } from './paginated-params'

enum StatusEnum {
  true = 'true',
  false = 'false',
  all = 'all',
}

export class StatusParamsDto extends PaginatedParamsDto {
  @ApiProperty({
    description: 'Estado',
    enum: StatusEnum,
    example: 'all',
    default: 'all',
  })
  @IsOptional()
  @IsBoolean({
    message:
      'el estado habilitado debe ser uno de los siguientes valores = true, false, all',
  })
  @Transform(({ value }) => {
    if (value === undefined || value === null || value === '') {
      return null
    }

    if (value === 'true') return true
    if (value === 'false') return false
    if (value === 'all') return null

    return value
  })
  enable?: boolean | null = null
}
