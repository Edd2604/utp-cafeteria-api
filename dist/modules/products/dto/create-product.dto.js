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
exports.CreateProductDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateProductDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { nombre: { required: true, type: () => String }, descripcion: { required: true, type: () => String }, precio: { required: true, type: () => Number }, limite_de_orden: { required: true, type: () => Number, minimum: 1 }, categoria: { required: true, type: () => Object }, habilitado: { required: true, type: () => Boolean } };
    }
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'El nombre del producto debe ser una cadena de texto' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsString)({
        message: 'La descripción del producto debe ser una cadena de texto',
    }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "descripcion", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }, { message: 'El precio del producto debe ser un número decimal' }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "precio", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsPositive)({
        message: 'El limite de orden del producto debe ser un número positivo',
    }),
    (0, class_validator_1.IsInt)({
        message: 'El limite de orden del producto debe ser un número entero',
    }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "limite_de_orden", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.Categoria }),
    (0, class_validator_1.IsEnum)(client_1.Categoria, { message: 'La categoria no es válida' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "categoria", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === 'true'),
    (0, class_validator_1.IsBoolean)({ message: 'El estado habilitado debe ser un valor booleano.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateProductDto.prototype, "habilitado", void 0);
//# sourceMappingURL=create-product.dto.js.map