import { SearchQueryParamsDto } from '@common/query-params/search-query-params'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { Estado } from '@prisma/client'
import { IsEnum, IsOptional } from 'class-validator'

export class OrdersQueryParams extends SearchQueryParamsDto {
  @ApiPropertyOptional({
    enum: Estado,
    default: '',
    description: 'Estado de la orden',
  })
  @IsEnum(Estado)
  @IsOptional()
  status: string
}
