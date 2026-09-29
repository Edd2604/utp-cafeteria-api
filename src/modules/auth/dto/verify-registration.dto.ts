/* eslint-disable @typescript-eslint/no-explicit-any */
import { IsNotEmpty } from 'class-validator'

export class VerifyRegistrationDto {
  @IsNotEmpty()
  credential: any

  @IsNotEmpty()
  expectedChallenge: string

  @IsNotEmpty()
  userId: number
}
