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
exports.CreateOrderDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_order_item_dto_1 = require("./create-order-item.dto");
class CreateOrderDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { hora_programada: { required: true, type: () => Date }, monto_total: { required: true, type: () => Number }, orderItems: { required: true, type: () => [require("./create-order-item.dto").CreateOrderItem], minItems: 1 } };
    }
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)({ message: 'la hora programada debe ser una fecha' }),
    __metadata("design:type", Date)
], CreateOrderDto.prototype, "hora_programada", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }, { message: 'El monto total debe ser un número decimal' }),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "monto_total", void 0);
__decorate([
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_order_item_dto_1.CreateOrderItem),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "orderItems", void 0);
//# sourceMappingURL=create-order.dto.js.map