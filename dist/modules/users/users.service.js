"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../providers/prisma/prisma.service");
const reniec_service_1 = require("../../providers/reniec/reniec.service");
const client_1 = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma_exception_1 = require("../../providers/prisma/exceptions/prisma.exception");
const format_date_1 = require("../../common/utils/format-date");
let UsersService = class UsersService {
    constructor(db, reniecService) {
        this.db = db;
        this.reniecService = reniecService;
    }
    async create(createUserDto, role) {
        const { contraseña, ...rest } = createUserDto;
        const { nombres, apellidoMaterno, apellidoPaterno } = await this.reniecService.getInfoDNI(createUserDto.dni);
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
            });
            return {
                ...newUser,
                creado: (0, format_date_1.formatDate)(newUser.creado),
                actualizado: (0, format_date_1.formatDate)(newUser.actualizado),
            };
        }
        catch (e) {
            if (e.code)
                throw new prisma_exception_1.PrismaException(e);
            throw new common_1.InternalServerErrorException('Hubo un error al crear el usuario');
        }
    }
    async findAllAdmins({ query, page, page_size, enable, }) {
        const pages = page || 1;
        const skip = (pages - 1) * page_size;
        const where = {
            AND: [
                query
                    ? {
                        nombre: { contains: query, mode: client_1.Prisma.QueryMode.insensitive },
                    }
                    : {},
                enable !== null && enable !== undefined ? { habilitado: enable } : {},
            ],
            archivado: false,
            rol: client_1.Rol.ADMINISTRADOR,
        };
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
        ]);
        const data = users.map((user) => {
            return {
                ...user,
                creado: (0, format_date_1.formatDate)(user.creado),
                actualizado: (0, format_date_1.formatDate)(user.actualizado),
            };
        });
        const totalPages = Math.ceil(total / page_size);
        return { data, total, totalPages };
    }
    async findAllStudents({ query, page, page_size, enable, }) {
        const pages = page || 1;
        const skip = (pages - 1) * page_size;
        const where = {
            AND: [
                query
                    ? {
                        nombre: { contains: query, mode: client_1.Prisma.QueryMode.insensitive },
                    }
                    : {},
                enable !== null && enable !== undefined ? { habilitado: enable } : {},
            ],
            archivado: false,
            rol: client_1.Rol.ESTUDIANTE,
        };
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
        ]);
        const data = users.map((user) => {
            return {
                ...user,
                creado: (0, format_date_1.formatDate)(user.creado),
                actualizado: (0, format_date_1.formatDate)(user.actualizado),
            };
        });
        const totalPages = Math.ceil(total / page_size);
        return { data, total, totalPages };
    }
    async findAllTeachers({ query, page, page_size, enable, }) {
        const pages = page || 1;
        const skip = (pages - 1) * page_size;
        const where = {
            AND: [
                query
                    ? {
                        nombre: { contains: query, mode: client_1.Prisma.QueryMode.insensitive },
                    }
                    : {},
                enable !== null && enable !== undefined ? { habilitado: enable } : {},
            ],
            archivado: false,
            rol: client_1.Rol.PROFESOR,
        };
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
        ]);
        const data = users.map((user) => {
            return {
                ...user,
                creado: (0, format_date_1.formatDate)(user.creado),
                actualizado: (0, format_date_1.formatDate)(user.actualizado),
            };
        });
        const totalPages = Math.ceil(total / page_size);
        return { data, total, totalPages };
    }
    async getOne(id) {
        const user = await this.db.usuario.findFirst({
            omit: {
                contraseña: true,
                archivado: true,
            },
            where: {
                id,
                archivado: false,
            },
        });
        if (!user)
            throw new common_1.NotFoundException(`El usuario del id ${id} no existe`);
        return {
            ...user,
            creado: (0, format_date_1.formatDate)(user.creado),
            actualizado: (0, format_date_1.formatDate)(user.actualizado),
        };
    }
    async getOneByEmail(correo) {
        const user = await this.db.usuario.findFirst({
            omit: {
                archivado: true,
            },
            where: {
                correo,
                archivado: false,
            },
        });
        if (!user)
            throw new common_1.NotFoundException(`El usuario con el correo ${correo} no existe`);
        return user;
    }
    async update(id, updateUserDto) {
        let nombre = null;
        let apellidos = null;
        if (updateUserDto.dni) {
            const reniec = await this.reniecService.getInfoDNI(updateUserDto.dni);
            nombre = reniec.nombres;
            apellidos = reniec.apellidoPaterno + ' ' + reniec.apellidoMaterno;
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
            });
            return {
                ...updatedUser,
                creado: (0, format_date_1.formatDate)(updatedUser.creado),
                actualizado: (0, format_date_1.formatDate)(updatedUser.actualizado),
            };
        }
        catch (e) {
            if (e.code)
                throw new prisma_exception_1.PrismaException(e);
            throw new common_1.InternalServerErrorException('Hubo un error al actualizar el usuario');
        }
    }
    async updatePassword(id, dto) {
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
            });
            return {
                ...updatedUser,
                creado: (0, format_date_1.formatDate)(updatedUser.creado),
                actualizado: (0, format_date_1.formatDate)(updatedUser.actualizado),
            };
        }
        catch (e) {
            if (e.code)
                throw new prisma_exception_1.PrismaException(e);
            throw new common_1.InternalServerErrorException('Hubo un error al actualizar la contraseña del usuario');
        }
    }
    async remove(id) {
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
            });
            return { id: archivedUser.id, message: 'Usuario archivado' };
        }
        catch (e) {
            if (e.code)
                throw new prisma_exception_1.PrismaException(e);
            throw new common_1.InternalServerErrorException('Hubo un error al archivar el usuario');
        }
    }
    async verifyDni(dni) {
        return await this.reniecService.getInfoDNI(dni);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        reniec_service_1.ReniecService])
], UsersService);
//# sourceMappingURL=users.service.js.map