import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Patch,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserSession } from '@modules/auth/decorators/user-session.decorator'
import { IUserSession } from '@modules/auth/interfaces/user-session.interface'
import { ValidateId } from '@common/pipes/validate-id.pipe'
import { Estado } from '@prisma/client'
import { Auth } from '@modules/auth/decorators/auth.decorator'
import { SearchQueryParamsDto } from '@common/query-params/search-query-params'

import { OrdersService } from './orders.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { OrdersQueryParams } from './query-params/orders-query-params'

@ApiTags('Ordenes')
@Controller('ordenes')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @Auth(['PROFESOR', 'ESTUDIANTE'])
  @Post('crear-orden')
  @ApiOperation({
    summary: 'Crea una orden',
  })
  create(
    @UserSession() user: IUserSession,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.create(createOrderDto, user)
  }

  @Get('obtener-ordenes')
  @ApiOperation({
    summary: 'Obtiene todas las ordenes',
  })
  findAll(@Query() params: OrdersQueryParams) {
    return this.ordersService.findAll(params)
  }

  @Get('obtener-ordenes-hoy')
  @ApiOperation({
    summary: 'Obtiene todas las ordenes del dia',
  })
  findAllToday(@Query() params: OrdersQueryParams) {
    return this.ordersService.findAllToday(params)
  }

  @ApiBearerAuth()
  @Auth(['ESTUDIANTE', 'PROFESOR'])
  @Get('obtener-ordenes-usuario')
  @ApiOperation({
    summary: 'Obtiene todas las ordenes por usuario',
  })
  findAllByUser(
    @UserSession() user: IUserSession,
    @Query() params: SearchQueryParamsDto,
  ) {
    return this.ordersService.findAllByUser(user.id, params)
  }

  @Get(':id/obtener-orden')
  @ApiOperation({
    summary: 'Obtiene una orden',
  })
  findOne(@Param('id', ValidateId) id: number) {
    return this.ordersService.findOne(id)
  }

  @Patch(':id/procesar-orden')
  @ApiOperation({
    summary: 'Marca como en proceso una orden',
  })
  processOrder(@Param('id', ValidateId) id: number) {
    return this.ordersService.changeStatusOrder(id, Estado.EN_PROCESO)
  }

  @Patch(':id/recoger-orden')
  @ApiOperation({
    summary: 'Marca como disponible para recoger una orden',
  })
  pickupOrder(@Param('id', ValidateId) id: number) {
    return this.ordersService.changeStatusOrder(id, Estado.RECOGER)
  }

  @Patch(':id/abandonar-orden')
  @ApiOperation({
    summary: 'Marca como abandonada una orden',
  })
  abandonOrder(@Param('id', ValidateId) id: number) {
    return this.ordersService.changeStatusOrder(id, Estado.ABANDONADA)
  }

  @Patch(':id/completar-orden')
  @ApiOperation({
    summary: 'Marca como completada una orden',
  })
  completeOrder(@Param('id', ValidateId) id: number) {
    return this.ordersService.changeStatusOrder(id, Estado.COMPLETADA)
  }

  @Patch(':id/cancelar-orden')
  @ApiOperation({
    summary: 'Marca como cancelada una orden',
  })
  cancelOrder(@Param('id', ValidateId) id: number) {
    return this.ordersService.changeStatusOrder(id, Estado.CANCELADA)
  }
}
