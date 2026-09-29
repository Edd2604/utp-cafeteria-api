import { Module } from '@nestjs/common'

import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'

@Module({
  exports: [ProductsService],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
