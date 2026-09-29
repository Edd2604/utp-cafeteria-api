import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { PrismaService } from '@providers/prisma/prisma.service'
import * as webPush from 'web-push'
import { PushSubscription } from 'web-push'
import { PrismaException } from '@providers/prisma/exceptions/prisma.exception'

import { CreateSubscriptionDto } from './dto/create-subscription.dto'
@Injectable()
export class EventsService {
  constructor(
    private readonly db: PrismaService,
    @Inject('WEB_PUSH') private readonly push: typeof webPush,
  ) {}

  async saveSubscription(dto: CreateSubscriptionDto) {
    const { userId, subscription } = dto

    try {
      return this.db.usuario.update({
        where: { id: userId },
        data: {
          pushSubscription: subscription,
        },
      })
    } catch (e) {
      if (e.code) {
        throw new PrismaException(e)
      }
      throw new InternalServerErrorException(
        'No se pude guardar la subscripcion ',
      )
    }
  }

  async sendNotification(
    userId: number,
    payload: { title: string; body: string; url?: string },
  ) {
    const user = await this.db.usuario.findUnique({
      where: { id: userId },
    })

    if (user?.pushSubscription) {
      const subscription = user.pushSubscription as unknown as PushSubscription
      await this.push.sendNotification(subscription, JSON.stringify(payload))
    }
  }
}
