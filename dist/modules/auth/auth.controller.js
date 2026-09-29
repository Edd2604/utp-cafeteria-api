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
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const signIn_dto_1 = require("./dto/signIn.dto");
const user_session_decorator_1 = require("./decorators/user-session.decorator");
const auth_decorator_1 = require("./decorators/auth.decorator");
const refresh_guard_1 = require("./guards/refresh.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signIn(signInDto) {
        return await this.authService.signIn(signInDto);
    }
    getProfile(user) {
        if (!user)
            throw new common_1.BadRequestException('No se ha encontrado el usuario');
        return user;
    }
    refreshToken(req) {
        return this.authService.refresh(req.user);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('/iniciar-sesion'),
    (0, swagger_1.ApiOperation)({
        summary: 'Inicia sesión y devuelve un token de acceso e información del usuario',
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signIn_dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, auth_decorator_1.Auth)(['ADMINISTRADOR', 'ESTUDIANTE']),
    (0, common_1.Get)('/perfil'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtiene información del usuario mediante el token de acceso',
    }),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, user_session_decorator_1.UserSession)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UseGuards)(refresh_guard_1.RefreshTokenGuard),
    (0, common_1.Post)('/refresh-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualiza el token de acceso',
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refreshToken", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Autenticación'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map