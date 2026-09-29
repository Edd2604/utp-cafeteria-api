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
exports.UpdateStockDto = exports.StockMovementType = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var StockMovementType;
(function (StockMovementType) {
    StockMovementType["ENTRADA"] = "ENTRADA";
    StockMovementType["SALIDA"] = "SALIDA";
})(StockMovementType || (exports.StockMovementType = StockMovementType = {}));
class UpdateStockDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { producto_id: { required: true, type: () => Number, minimum: 1 }, cantidad: { required: true, type: () => Number, minimum: 1 }, tipo: { required: true, enum: require("./update-stock.dto").StockMovementType } };
    }
}
exports.UpdateStockDto = UpdateStockDto;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: 'El ID del producto debe ser un número entero' }),
    (0, class_validator_1.IsPositive)({ message: 'El ID del producto debe ser mayor a 0' }),
    __metadata("design:type", Number)
], UpdateStockDto.prototype, "producto_id", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: 'La cantidad debe ser un número entero' }),
    (0, class_validator_1.IsPositive)({ message: 'La cantidad debe ser mayor a 0' }),
    __metadata("design:type", Number)
], UpdateStockDto.prototype, "cantidad", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(StockMovementType, {
        message: 'El tipo debe ser ENTRADA o SALIDA',
    }),
    __metadata("design:type", String)
], UpdateStockDto.prototype, "tipo", void 0);
//# sourceMappingURL=update-stock.dto.js.map