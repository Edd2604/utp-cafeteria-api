import { Controller, Get, Param, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { PaymentsService } from './payments.service'
import { PaymentsQueryParams } from './query-params/payments-query-params'

@ApiTags('Pagos')
@Controller('pagos')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiOperation({
    summary: 'Obtiene todas los pagos',
  })
  @Get('obtener-pagos')
  async findAll(@Query() dto: PaymentsQueryParams) {
    return await this.paymentsService.findAll(dto)
  }

  @ApiOperation({
    summary: 'Obtiene un pago por id',
  })
  @Get(':id/obtener-pago')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(+id)
  }
}
