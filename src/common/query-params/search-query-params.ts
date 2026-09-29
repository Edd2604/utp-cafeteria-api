import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

import { PaginatedParamsDto } from './paginated-params'

export class SearchQueryParamsDto extends PaginatedParamsDto {
  @ApiPropertyOptional({ description: 'Texto de búsqueda', example: '' })
  @IsOptional()
  @IsString()
  query?: string = ''
}
