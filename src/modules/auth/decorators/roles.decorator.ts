import { SetMetadata } from '@nestjs/common'
import { Rol } from '@prisma/client'
export const ROLES_KEY = 'ROLES'
export const Roles = (roles: Rol[]) => SetMetadata(ROLES_KEY, roles)
