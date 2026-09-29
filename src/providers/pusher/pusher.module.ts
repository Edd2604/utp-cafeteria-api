import { Global, Module } from '@nestjs/common'

import { PusherProvider } from './pusher.provider'
import { PusherService } from './pusher.service'

@Global()
@Module({
  providers: [PusherProvider, PusherService],
  exports: [PusherService],
})
export class PusherModule {}
