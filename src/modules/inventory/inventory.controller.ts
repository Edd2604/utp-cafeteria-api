import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { SearchQueryParamsDto } from '@common/query-params/search-query-params'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { InventoryService } from './inventory.service'
import { UpdateStockDto } from './dto/update-stock.dto'

@ApiTags('Inventario')
@Controller('inventario')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('obtener-inventario-hoy')
  @ApiOperation({
    summary: 'Obtiene el inventario de hoy',
  })
  findAll(@Query() params: SearchQueryParamsDto) {
    return this.inventoryService.getInventoryToday(params)
  }

  @Post('generar-inventario')
  async generateManualInventory() {
    return await this.inventoryService.generateInventory()
  }

  @Delete('reiniciar-inventario')
  async resetInventory() {
    return await this.inventoryService.resetInventory()
  }

  @Patch('actualizar-stock')
  async updateStock(@Body() updateStockDto: UpdateStockDto) {
    await this.inventoryService.updateProductStock(updateStockDto)
    return {
      message: 'Stock actualizado del producto ' + updateStockDto.producto_id,
    }
  }
}
