import { envs } from '@config/envs'
import { Provider } from '@nestjs/common'
import * as webPush from 'web-push'

export const WebPushProvider: Provider = {
  provide: 'WEB_PUSH',
  useFactory: () => {
    webPush.setVapidDetails(
      'mailto:eddie.ehc04@gmail.com',
      envs.vapidPublicKey,
      envs.vapidPrivateKey,
    )
    return webPush
  },
}
