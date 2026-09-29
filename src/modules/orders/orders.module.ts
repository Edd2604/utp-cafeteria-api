import { Module } from '@nestjs/common'
import { ProductsModule } from '@modules/products/products.module'
import { InventoryModule } from '@modules/inventory/inventory.module'

import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'

@Module({
  imports: [ProductsModule, InventoryModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
