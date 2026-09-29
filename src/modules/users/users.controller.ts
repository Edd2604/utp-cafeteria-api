import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { SearchStatusQueryParamsDto } from '@common/query-params/search-status-query-params'
import { PublicAccess } from '@auth/decorators/public.decorator'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ValidateId } from '@common/pipes/validate-id.pipe'
import { IUserSession } from '@auth/interfaces/user-session.interface'
import { UserSession } from '@modules/auth/decorators/user-session.decorator'

import { ValidateDNI } from './pipes/validate-dni.pipe'
import { UpdateUserDto } from './dto/update-user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'
import { NewPasswordDto } from './dto/new-password.dto'

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('crear-administrador')
  @ApiOperation({
    summary: 'Crea un administrador del sistema',
  })
  async createAdmin(
    @UserSession() session: IUserSession,
    @Body() createUserDto: CreateUserDto,
  ) {
    const admin = await this.usersService.create(createUserDto, 'ADMINISTRADOR')
    return admin
  }

  @Post('crear-estudiante')
  @ApiOperation({
    summary: 'Crea un estudiante del sistema',
  })
  async crearStudent(
    @UserSession() session: IUserSession,
    @Body() createUserDto: CreateUserDto,
  ) {
    const user = await this.usersService.create(createUserDto, 'ESTUDIANTE')
    return user
  }

  @Post('crear-profesor')
  @ApiOperation({
    summary: 'Crea un profesor del sistema',
  })
  async createTeacher(
    @UserSession() session: IUserSession,
    @Body() createUserDto: CreateUserDto,
  ) {
    const teacher = await this.usersService.create(createUserDto, 'PROFESOR')
    return teacher
  }

  @Get('obtener-administradores')
  @ApiOperation({
    summary: 'Obtiene todos los administradores',
  })
  async getAllAdmins(@Query() query: SearchStatusQueryParamsDto) {
    return this.usersService.findAllAdmins(query)
  }

  @Get('obtener-estudiantes')
  @ApiOperation({
    summary: 'Obtiene todos los estudiantes registrados',
  })
  async getAllStudents(@Query() query: SearchStatusQueryParamsDto) {
    return this.usersService.findAllStudents(query)
  }

  @Get('obtener-profesores')
  @ApiOperation({
    summary: 'Obtiene todos los profesores registrados',
  })
  async getAllTeachers(@Query() query: SearchStatusQueryParamsDto) {
    return this.usersService.findAllTeachers(query)
  }

  @PublicAccess()
  @Get(':usuarioDNI/verificar-dni')
  @ApiOperation({
    summary: 'Verifica el dni de un usuario',
  })
  async verifyDni(@Param('usuarioDNI', ValidateDNI) dni: string) {
    return this.usersService.verifyDni(dni)
  }

  @Get(':usuarioID/obtener-usuario')
  @ApiOperation({
    summary: 'Obtiene un usuario',
  })
  async getOneUser(@Param('usuarioID', ValidateId) userId: number) {
    return this.usersService.getOne(userId)
  }

  @Patch(':usuarioID/actualizar-usuario')
  @ApiOperation({
    summary: 'Actualiza la información de un usuario',
  })
  async updateUser(
    @Param('usuarioID', ValidateId) userId: number,
    @UserSession() session: IUserSession,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const admin = await this.usersService.update(userId, updateUserDto)
    return admin
  }

  @Patch(':usuarioID/actualizar-contra')
  @ApiOperation({
    summary: 'Actualiza la contraseña de un usuario',
  })
  async updatePassword(
    @Param('usuarioID', ValidateId) userId: number,
    @Body() dto: NewPasswordDto,
  ) {
    const admin = await this.usersService.updatePassword(userId, dto)
    return admin
  }

  @Delete(':usuarioID/remover-usuario')
  @ApiOperation({
    summary: 'Archiva un usuario',
  })
  async removeUser(@Param('usuarioID', ValidateId) userId: number) {
    const admin = await this.usersService.remove(userId)
    return admin
  }
}
