import { Module } from '@nestjs/common'
import { ProductsModule } from '@modules/products/products.module'

import { InventoryService } from './inventory.service'
import { InventoryController } from './inventory.controller'

@Module({
  exports: [InventoryService],
  imports: [ProductsModule],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
