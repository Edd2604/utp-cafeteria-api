import { BadRequestException } from '@nestjs/common'

interface PrismaConflictException {
  code: string
  meta: {
    target: string[]
    modelName: string
  }
}

export class PrismaException extends BadRequestException {
  constructor(error: PrismaConflictException) {
    let message = 'Ocurrió un error inesperado.'

    switch (error.code) {
      case 'P2002':
        message = `Ya existe un registro con el campo único: ${error.meta?.target?.join(', ')}`
        break
      case 'P2025':
        message = `El registro que intentas actualizar/archivar no existe.`
        break
      default:
        message = `Error de base de datos: código ${error.code}`
    }

    super(message)
    this.name = 'PrismaException'
  }
}
