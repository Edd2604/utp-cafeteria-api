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
exports.NewPasswordDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class NewPasswordDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { nueva_contraseña: { required: true, type: () => String, minLength: 8, maxLength: 20 } };
    }
}
exports.NewPasswordDto = NewPasswordDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'La nueva contraseña debe ser una cadena de texto' }),
    (0, class_validator_1.Length)(8, 20, {
        message: 'La nueva contraseña debe tener entre 8 y 20 caracteres.',
    }),
    __metadata("design:type", String)
], NewPasswordDto.prototype, "nueva_contrase\u00F1a", void 0);
//# sourceMappingURL=new-password.dto.js.map