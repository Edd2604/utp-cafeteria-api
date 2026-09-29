import { Module } from '@nestjs/common'
import { ReniecModule } from '@providers/reniec/reniec.module'
import { PrismaModule } from '@providers/prisma/prisma.module'
import { ScheduleModule } from '@nestjs/schedule'
import { OrdersModule } from '@modules/orders/orders.module'
import { CloudinaryModule } from '@providers/cloudinary/cloudinary.module'
import { PusherModule } from '@providers/pusher/pusher.module'

import { UsersModule } from './modules/users/users.module'
import { ProductsModule } from './modules/products/products.module'
import { AuthModule } from './modules/auth/auth.module'
import { InventoryModule } from './modules/inventory/inventory.module'
import { PaymentsModule } from './modules/payments/payments.module'
import { EventsModule } from './modules/events/events.module'
import { VapidService } from './providers/vapid/vapid.service'

@Module({
  imports: [
    ReniecModule,
    PrismaModule,
    UsersModule,
    OrdersModule,
    PusherModule,
    ProductsModule,
    CloudinaryModule,
    AuthModule,
    InventoryModule,
    ScheduleModule.forRoot(),
    PaymentsModule,
    EventsModule,
  ],
  controllers: [],
  providers: [VapidService],
})
export class AppModule {}
