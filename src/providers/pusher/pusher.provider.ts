import { Provider } from '@nestjs/common'
import { envs } from 'src/config/envs'
import * as Pusher from 'pusher'

export const PUSHER = 'PUSHER' as const

export const PusherProvider: Provider = {
  provide: PUSHER,
  useFactory: () => {
    return new Pusher({
      appId: envs.pusherAppId,
      key: envs.pusherKey,
      secret: envs.pusherSecret,
      cluster: envs.pusherCluster,
      useTLS: true,
    })
  },
}
