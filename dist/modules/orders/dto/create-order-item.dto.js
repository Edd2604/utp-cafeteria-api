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
exports.CreateOrderItem = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateOrderItem {
    static _OPENAPI_METADATA_FACTORY() {
        return { producto_id: { required: true, type: () => Number, minimum: 1 }, nombre_producto: { required: true, type: () => String }, cantidad: { required: true, type: () => Number, minimum: 1 }, precio: { required: true, type: () => Number } };
    }
}
exports.CreateOrderItem = CreateOrderItem;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsPositive)({ message: 'El id del producto debe ser un número positivo' }),
    (0, class_validator_1.IsInt)({ message: 'El id del producto debe ser un número entero' }),
    __metadata("design:type", Number)
], CreateOrderItem.prototype, "producto_id", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'el nombre del producto debe ser una cadena de texto' }),
    __metadata("design:type", String)
], CreateOrderItem.prototype, "nombre_producto", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsPositive)({ message: 'La cantidad debe ser un número positivo' }),
    (0, class_validator_1.IsInt)({ message: 'La cantidad debe ser un número entero' }),
    __metadata("design:type", Number)
], CreateOrderItem.prototype, "cantidad", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }, { message: 'El precio del producto debe ser un decimal' }),
    __metadata("design:type", Number)
], CreateOrderItem.prototype, "precio", void 0);
//# sourceMappingURL=create-order-item.dto.js.map