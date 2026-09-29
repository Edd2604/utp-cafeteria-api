/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Injectable } from '@nestjs/common'
import Pusher from 'pusher'

import { PUSHER } from './pusher.provider'

@Injectable()
export class PusherService {
  constructor(@Inject(PUSHER) private readonly pusher: Pusher) {}

  async trigger(channel: string, event: string, data: any) {
    try {
      await this.pusher.trigger(channel, event, data)
    } catch (e) {
      console.error(
        `Error al emitir el evento [${event}] en canal [${channel}]`,
        e,
      )
    }
  }
}
