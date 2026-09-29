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
exports.CreateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { dni: { required: true, type: () => String, minLength: 8, maxLength: 8 }, correo: { required: true, type: () => String, format: "email", pattern: "/^([AUC]\\d{8})@utp\\.edu\\.pe$/" }, contraseña: { required: true, type: () => String, minLength: 8, maxLength: 20 }, habilitado: { required: true, type: () => Boolean } };
    }
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'El DNI debe ser una cadena de texto' }),
    (0, class_validator_1.Length)(8, 8, { message: 'El DNI debe tener exactamente 8 caracteres.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "dni", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'El correo debe ser uno válido' }),
    (0, class_validator_1.Matches)(/^([AUC]\d{8})@utp\.edu\.pe$/, {
        message: 'El correo no posee el formato correcto',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "correo", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'La contraseña debe ser una cadena de texto' }),
    (0, class_validator_1.Length)(8, 20, {
        message: 'La contraseña debe tener entre 8 y 20 caracteres.',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "contrase\u00F1a", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)({ message: 'El estado habilitado debe ser un valor booleano.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "habilitado", void 0);
//# sourceMappingURL=create-user.dto.js.map