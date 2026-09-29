import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { SignInDto } from './dto/signIn.dto'
import { UserSession } from './decorators/user-session.decorator'
import { IUserSession } from './interfaces/user-session.interface'
import { Auth } from './decorators/auth.decorator'
import { RefreshTokenGuard } from './guards/refresh.guard'

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/iniciar-sesion')
  @ApiOperation({
    summary:
      'Inicia sesión y devuelve un token de acceso e información del usuario',
  })
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto)
  }

  @ApiBearerAuth()
  @Auth(['ADMINISTRADOR', 'ESTUDIANTE'])
  @Get('/perfil')
  @ApiOperation({
    summary: 'Obtiene información del usuario mediante el token de acceso',
  })
  getProfile(@UserSession() user: IUserSession) {
    if (!user) throw new BadRequestException('No se ha encontrado el usuario')
    return user
  }

  @UseGuards(RefreshTokenGuard)
  @Post('/refresh-token')
  @ApiOperation({
    summary: 'Actualiza el token de acceso',
  })
  refreshToken(@Request() req) {
    return this.authService.refresh(req.user)
  }

  // @ApiBearerAuth()
  // @Auth(['ESTUDIANTE'])
  // @Post('generate-authentication-options')
  // async generateAuthenticationOptions(@UserSession() session: IUserSession) {
  //   const user = await this.authService.verifyUserbyEmail(session.correo)
  //   if (!user || user.webAuthnCredentials.length === 0)
  //     throw new NotFoundException(
  //       'No hay credenciales registradas para este usuario',
  //     )

  //   const options = generateAuthenticationOptions({
  //     allowCredentials: user.webAuthnCredentials.map((cred) => ({
  //       id: Buffer.from(cred.credential_id).toString('base64'),
  //       type: 'public-key',
  //       transports: ['internal'],
  //     })),
  //     userVerification: 'preferred',
  //     timeout: 60000,
  //     rpID: '',
  //   })

  //   return {
  //     options,
  //     userId: user.id,
  //   }
  // }
}
