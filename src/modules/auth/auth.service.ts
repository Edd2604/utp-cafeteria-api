import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '@modules/users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { IUserSession } from '@auth/interfaces/user-session.interface'
import { envs } from '@config/envs'
import { PrismaService } from '@providers/prisma/prisma.service'

import { SignInDto } from './dto/signIn.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly db: PrismaService,
  ) {}

  async signIn({ correo, contraseña }: SignInDto) {
    const user = await this.userService.getOneByEmail(correo)

    const match = await bcrypt.compare(contraseña, user.contraseña)

    if (!match) throw new UnauthorizedException('La contraseña es incorrecta')

    if (!user.habilitado)
      throw new UnauthorizedException('El usuario esta deshabilitado')

    const payload: IUserSession = {
      id: user.id,
      usuario: user.nombre + ' ' + user.apellidos,
      correo: user.correo,
      rol: user.rol,
    }

    return {
      user: payload,
      tokens: {
        access: await this.jwtService.signAsync(payload, {
          secret: envs.jwtSecret,
          expiresIn: '1d',
        }),
        refresh: await this.jwtService.signAsync(payload, {
          secret: envs.jwtRefreshSecret,
          expiresIn: '7d',
        }),
      },
    }
  }

  async refresh(user: IUserSession) {
    const payload: IUserSession = {
      id: user.id,
      usuario: user.usuario,
      correo: user.correo,
      rol: user.rol,
    }
    return {
      access: await this.jwtService.signAsync(payload, {
        secret: envs.jwtSecret,
        expiresIn: '1d',
      }),
      refresh: await this.jwtService.signAsync(payload, {
        secret: envs.jwtSecret,
        expiresIn: '7d',
      }),
    }
  }

  // async generateRegistrationOptions(correo: string) {
  //   const user = await this.userService.getOneByEmail(correo)

  //   const userCreds = await this.db.webAuthnCredential.findMany({
  //     where: { usuario_id: user.id },
  //   })

  //   return generateRegistrationOptions({
  //     rpName: 'UTP cafeteria',
  //     rpID: WEB_AUTHN_RPID,
  //     userID: new TextEncoder().encode(user.id.toString()),
  //     userName: user.correo,
  //     attestationType: 'none',
  //     excludeCredentials: userCreds.map((cred) => ({
  //       id: Buffer.from(cred.credential_id).toString('base64'),
  //       type: 'public-key',
  //       transports: ['internal'],
  //     })),
  //     authenticatorSelection: {
  //       userVerification: 'required',
  //       authenticatorAttachment: 'platform',
  //     },
  //   })
  // }

  // async verifyRegistration(dto: VerifyRegistrationDto) {
  //   const { credential, expectedChallenge, userId } = dto

  //   const user = await this.db.usuario.findUnique({
  //     where: { id: userId },
  //   })

  //   if (!user) throw new NotFoundException('Usuario no encontrado')

  //   const verification = await verifyRegistrationResponse({
  //     response: credential,
  //     expectedChallenge,
  //     expectedOrigin: WEB_AUTHN_ORIGIN,
  //     expectedRPID: WEB_AUTHN_RPID,
  //   })

  //   if (!verification.verified || !verification.registrationInfo) {
  //     throw new BadRequestException('Verificación fallida')
  //   }

  //   const {
  //     credential: { id, publicKey, counter },
  //   } = verification.registrationInfo

  //   await this.db.webAuthnCredential.create({
  //     data: {
  //       credential_id: Buffer.from(id),
  //       public_key: Buffer.from(publicKey),
  //       counter,
  //       Usuario: { connect: { id: userId } },
  //     },
  //   })

  //   return { success: true }
  // }

  // async verifyAuthentication(dto: VerifyRegistrationDto, correo: string) {
  //   const user = await this.userService.getOneByEmail(correo)

  //   const credential = user.webAuthnCredentials.find(
  //     (cred) =>
  //       Buffer.from(cred.credential_id).toString('base64') ===
  //       dto.credential.rawId,
  //   )

  //   if (!credential) {
  //     throw new BadRequestException('Credencial no encontrada')
  //   }

  //   const verification = await verifyAuthenticationResponse({
  //     response: dto.credential,
  //     expectedChallenge: dto.expectedChallenge,
  //     expectedOrigin: WEB_AUTHN_ORIGIN,
  //     expectedRPID: WEB_AUTHN_RPID,
  //     credential: {
  //       id: Buffer.from(credential.credential_id).toString('base64'), // o base64 si no usas base64url
  //       publicKey: credential.public_key, // Uint8Array (no Buffer)
  //       counter: credential.counter,
  //       transports: ['internal'], // opcional
  //     },
  //   })

  //   const { verified, authenticationInfo } = verification

  //   if (!verified || !authenticationInfo) {
  //     throw new BadRequestException('Verificación de autenticación fallida')
  //   }

  //   await this.db.webAuthnCredential.update({
  //     where: { id: credential.id },
  //     data: {
  //       counter: authenticationInfo.newCounter,
  //     },
  //   })

  //   return {
  //     success: true,
  //     message: 'Inicio de sesión biométrico exitoso',
  //     userId: user.id,
  //   }
  // }
}
