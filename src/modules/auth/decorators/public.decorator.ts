import { SetMetadata } from '@nestjs/common'

export const PUBLIC_KEY = 'PUBLIC'
export const PublicAccess = () => SetMetadata('PUBLIC', true)
