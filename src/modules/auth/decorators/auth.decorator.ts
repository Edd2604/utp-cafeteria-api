import { applyDecorators, UseGuards } from '@nestjs/common'
import { Rol } from '@prisma/client'

import { AuthGuard } from '../guards/auth.guard'
import { RolesGuard } from '../guards/roles.guard'
import { Roles } from './roles.decorator'

export function Auth(roles: Rol[]) {
  return applyDecorators(Roles(roles), UseGuards(AuthGuard, RolesGuard))
}
