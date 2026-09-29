import { SearchQueryParamsDto } from '@common/query-params/search-query-params'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { MetodoPago } from '@prisma/client'
import { IsEnum, IsOptional } from 'class-validator'

export class PaymentsQueryParams extends SearchQueryParamsDto {
  @ApiPropertyOptional({
    enum: MetodoPago,
    default: '',
    description: 'Metodo de Pago',
  })
  @IsEnum(MetodoPago)
  @IsOptional()
  method: MetodoPago
}
