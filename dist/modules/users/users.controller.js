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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const search_status_query_params_1 = require("../../common/query-params/search-status-query-params");
const public_decorator_1 = require("../auth/decorators/public.decorator");
const swagger_1 = require("@nestjs/swagger");
const validate_id_pipe_1 = require("../../common/pipes/validate-id.pipe");
const user_session_decorator_1 = require("../auth/decorators/user-session.decorator");
const validate_dni_pipe_1 = require("./pipes/validate-dni.pipe");
const update_user_dto_1 = require("./dto/update-user.dto");
const create_user_dto_1 = require("./dto/create-user.dto");
const users_service_1 = require("./users.service");
const new_password_dto_1 = require("./dto/new-password.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async createAdmin(session, createUserDto) {
        const admin = await this.usersService.create(createUserDto, 'ADMINISTRADOR');
        return admin;
    }
    async crearStudent(session, createUserDto) {
        const user = await this.usersService.create(createUserDto, 'ESTUDIANTE');
        return user;
    }
    async createTeacher(session, createUserDto) {
        const teacher = await this.usersService.create(createUserDto, 'PROFESOR');
        return teacher;
    }
    async getAllAdmins(query) {
        return this.usersService.findAllAdmins(query);
    }
    async getAllStudents(query) {
        return this.usersService.findAllStudents(query);
    }
    async getAllTeachers(query) {
        return this.usersService.findAllTeachers(query);
    }
    async verifyDni(dni) {
        return this.usersService.verifyDni(dni);
    }
    async getOneUser(userId) {
        return this.usersService.getOne(userId);
    }
    async updateUser(userId, session, updateUserDto) {
        const admin = await this.usersService.update(userId, updateUserDto);
        return admin;
    }
    async updatePassword(userId, dto) {
        const admin = await this.usersService.updatePassword(userId, dto);
        return admin;
    }
    async removeUser(userId) {
        const admin = await this.usersService.remove(userId);
        return admin;
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('crear-administrador'),
    (0, swagger_1.ApiOperation)({
        summary: 'Crea un administrador del sistema',
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, user_session_decorator_1.UserSession)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createAdmin", null);
__decorate([
    (0, common_1.Post)('crear-estudiante'),
    (0, swagger_1.ApiOperation)({
        summary: 'Crea un estudiante del sistema',
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, user_session_decorator_1.UserSession)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "crearStudent", null);
__decorate([
    (0, common_1.Post)('crear-profesor'),
    (0, swagger_1.ApiOperation)({
        summary: 'Crea un profesor del sistema',
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, user_session_decorator_1.UserSession)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createTeacher", null);
__decorate([
    (0, common_1.Get)('obtener-administradores'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtiene todos los administradores',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_status_query_params_1.SearchStatusQueryParamsDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllAdmins", null);
__decorate([
    (0, common_1.Get)('obtener-estudiantes'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtiene todos los estudiantes registrados',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_status_query_params_1.SearchStatusQueryParamsDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllStudents", null);
__decorate([
    (0, common_1.Get)('obtener-profesores'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtiene todos los profesores registrados',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_status_query_params_1.SearchStatusQueryParamsDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllTeachers", null);
__decorate([
    (0, public_decorator_1.PublicAccess)(),
    (0, common_1.Get)(':usuarioDNI/verificar-dni'),
    (0, swagger_1.ApiOperation)({
        summary: 'Verifica el dni de un usuario',
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('usuarioDNI', validate_dni_pipe_1.ValidateDNI)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "verifyDni", null);
__decorate([
    (0, common_1.Get)(':usuarioID/obtener-usuario'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtiene un usuario',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('usuarioID', validate_id_pipe_1.ValidateId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getOneUser", null);
__decorate([
    (0, common_1.Patch)(':usuarioID/actualizar-usuario'),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualiza la información de un usuario',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('usuarioID', validate_id_pipe_1.ValidateId)),
    __param(1, (0, user_session_decorator_1.UserSession)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Patch)(':usuarioID/actualizar-contra'),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualiza la contraseña de un usuario',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('usuarioID', validate_id_pipe_1.ValidateId)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, new_password_dto_1.NewPasswordDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Delete)(':usuarioID/remover-usuario'),
    (0, swagger_1.ApiOperation)({
        summary: 'Archiva un usuario',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('usuarioID', validate_id_pipe_1.ValidateId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "removeUser", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Usuarios'),
    (0, common_1.Controller)('usuarios'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map