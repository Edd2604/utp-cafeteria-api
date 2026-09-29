import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '@providers/prisma/prisma.service'
import { ReniecService } from '@providers/reniec/reniec.service'
import { IReniecResponse } from '@providers/reniec/interfaces/reniec-response.interface'
import { Prisma, Rol } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
import { PrismaException } from '@providers/prisma/exceptions/prisma.exception'
import { SearchStatusQueryParamsDto } from '@common/query-params/search-status-query-params'
import { formatDate } from '@common/utils/format-date'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { NewPasswordDto } from './dto/new-password.dto'
@Injectable()
export class UsersService {
  constructor(
    private readonly db: PrismaService,
    private reniecService: ReniecService,
  ) {}
  async create(createUserDto: CreateUserDto, role: Rol) {
    const { contraseña, ...rest } = createUserDto

    const { nombres, apellidoMaterno, apellidoPaterno }: IReniecResponse =
      await this.reniecService.getInfoDNI(createUserDto.dni)
    try {
      const newUser = await this.db.usuario.create({
        omit: { archivado: true, contraseña: true },
        data: {
          nombre: nombres,
          apellidos: apellidoPaterno + ' ' + apellidoMaterno,
          contraseña: await bcrypt.hash(contraseña, 10),
          rol: role,
          ...rest,
        },
      })

      return {
        ...newUser,
        creado: formatDate(newUser.creado),
        actualizado: formatDate(newUser.actualizado),
      }
    } catch (e) {
      if (e.code) throw new PrismaException(e)

      throw new InternalServerErrorException(
        'Hubo un error al crear el usuario',
      )
    }
  }

  async findAllAdmins({
    query,
    page,
    page_size,
    enable,
  }: SearchStatusQueryParamsDto) {
    const pages = page || 1
    const skip = (pages - 1) * page_size
    const where = {
      AND: [
        query
          ? {
              nombre: { contains: query, mode: Prisma.QueryMode.insensitive },
            }
          : {},
        enable !== null && enable !== undefined ? { habilitado: enable } : {},
      ],
      archivado: false,
      rol: Rol.ADMINISTRADOR,
    }
    const [users, total] = await Promise.all([
      this.db.usuario.findMany({
        omit: {
          contraseña: true,
          archivado: true,
        },
        where,
        skip: skip,
        take: page_size,
      }),
      this.db.usuario.count({ where }),
    ])

    const data = users.map((user) => {
      return {
        ...user,
        creado: formatDate(user.creado),
        actualizado: formatDate(user.actualizado),
      }
    })

    const totalPages = Math.ceil(total / page_size)

    return { data, total, totalPages }
  }

  async findAllStudents({
    query,
    page,
    page_size,
    enable,
  }: SearchStatusQueryParamsDto) {
    const pages = page || 1
    const skip = (pages - 1) * page_size
    const where = {
      AND: [
        query
          ? {
              nombre: { contains: query, mode: Prisma.QueryMode.insensitive },
            }
          : {},
        enable !== null && enable !== undefined ? { habilitado: enable } : {},
      ],
      archivado: false,
      rol: Rol.ESTUDIANTE,
    }
    const [users, total] = await Promise.all([
      this.db.usuario.findMany({
        omit: {
          contraseña: true,
          archivado: true,
        },
        where,
        skip: skip,
        take: page_size,
      }),
      this.db.usuario.count({ where }),
    ])

    const data = users.map((user) => {
      return {
        ...user,
        creado: formatDate(user.creado),
        actualizado: formatDate(user.actualizado),
      }
    })

    const totalPages = Math.ceil(total / page_size)

    return { data, total, totalPages }
  }

  async findAllTeachers({
    query,
    page,
    page_size,
    enable,
  }: SearchStatusQueryParamsDto) {
    const pages = page || 1
    const skip = (pages - 1) * page_size
    const where = {
      AND: [
        query
          ? {
              nombre: { contains: query, mode: Prisma.QueryMode.insensitive },
            }
          : {},
        enable !== null && enable !== undefined ? { habilitado: enable } : {},
      ],
      archivado: false,
      rol: Rol.PROFESOR,
    }
    const [users, total] = await Promise.all([
      this.db.usuario.findMany({
        omit: {
          contraseña: true,
          archivado: true,
        },
        where,
        skip: skip,
        take: page_size,
      }),
      this.db.usuario.count({ where }),
    ])

    const data = users.map((user) => {
      return {
        ...user,
        creado: formatDate(user.creado),
        actualizado: formatDate(user.actualizado),
      }
    })

    const totalPages = Math.ceil(total / page_size)

    return { data, total, totalPages }
  }

  async getOne(id: number) {
    const user = await this.db.usuario.findFirst({
      omit: {
        contraseña: true,
        archivado: true,
      },
      where: {
        id,
        archivado: false,
      },
    })

    if (!user) throw new NotFoundException(`El usuario del id ${id} no existe`)

    return {
      ...user,
      creado: formatDate(user.creado),
      actualizado: formatDate(user.actualizado),
    }
  }

  async getOneByEmail(correo: string) {
    const user = await this.db.usuario.findFirst({
      omit: {
        archivado: true,
      },
      where: {
        correo,
        archivado: false,
      },
    })
    if (!user)
      throw new NotFoundException(
        `El usuario con el correo ${correo} no existe`,
      )

    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let nombre: string | null = null
    let apellidos: string | null = null

    if (updateUserDto.dni) {
      const reniec: IReniecResponse = await this.reniecService.getInfoDNI(
        updateUserDto.dni,
      )
      nombre = reniec.nombres
      apellidos = reniec.apellidoPaterno + ' ' + reniec.apellidoMaterno
    }

    try {
      const updatedUser = await this.db.usuario.update({
        omit: { archivado: true, contraseña: true },
        where: {
          id,
          archivado: false,
        },
        data: {
          ...updateUserDto,
          ...(nombre && { nombre }),
          ...(apellidos && { apellidos }),
        },
      })

      return {
        ...updatedUser,
        creado: formatDate(updatedUser.creado),
        actualizado: formatDate(updatedUser.actualizado),
      }
    } catch (e) {
      if (e.code) throw new PrismaException(e)

      throw new InternalServerErrorException(
        'Hubo un error al actualizar el usuario',
      )
    }
  }

  async updatePassword(id: number, dto: NewPasswordDto) {
    try {
      const updatedUser = await this.db.usuario.update({
        omit: { archivado: true, contraseña: true },
        where: {
          id,
          archivado: false,
        },
        data: {
          contraseña: await bcrypt.hash(dto.nueva_contraseña, 10),
        },
      })

      return {
        ...updatedUser,
        creado: formatDate(updatedUser.creado),
        actualizado: formatDate(updatedUser.actualizado),
      }
    } catch (e) {
      if (e.code) throw new PrismaException(e)

      throw new InternalServerErrorException(
        'Hubo un error al actualizar la contraseña del usuario',
      )
    }
  }

  async remove(id: number) {
    try {
      const archivedUser = await this.db.usuario.update({
        where: {
          id,
          archivado: false,
        },
        data: {
          habilitado: false,
          archivado: true,
        },
      })

      return { id: archivedUser.id, message: 'Usuario archivado' }
    } catch (e) {
      if (e.code) throw new PrismaException(e)

      throw new InternalServerErrorException(
        'Hubo un error al archivar el usuario',
      )
    }
  }

  async verifyDni(dni: string) {
    return await this.reniecService.getInfoDNI(dni)
  }
}
