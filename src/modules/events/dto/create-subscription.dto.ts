import { IsNotEmpty, IsObject } from 'class-validator'

export class CreateSubscriptionDto {
  @IsNotEmpty()
  userId: number

  @IsObject()
  subscription: {
    endpoint: string

    expirationTime: number | null

    keys: {
      p256dh: string
      auth: string
    }
  }
}
