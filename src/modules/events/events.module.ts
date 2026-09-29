import { Global, Module } from '@nestjs/common'

import { EventsService } from './events.service'
import { EventsController } from './events.controller'
import { WebPushProvider } from './events.provider'

@Global()
@Module({
  controllers: [EventsController],
  providers: [EventsService, WebPushProvider],
  exports: [EventsService],
})
export class EventsModule {}
