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
exports.PaginatedParamsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class PaginatedParamsDto {
    constructor() {
        this.page_size = 25;
        this.page = 1;
    }
}
exports.PaginatedParamsDto = PaginatedParamsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Cantidad de resultados por página',
        example: 25,
        default: 25,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1, { message: 'El tamaño de pagina debe ser al menos 1' }),
    (0, class_transformer_1.Transform)(({ value }) => (value ? parseInt(value, 10) : 25)),
    __metadata("design:type", Number)
], PaginatedParamsDto.prototype, "page_size", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Número de página',
        example: 1,
        default: 1,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1, { message: 'La número de pagina debe ser al menos 1' }),
    (0, class_transformer_1.Transform)(({ value }) => (value ? parseInt(value, 10) : 1)),
    __metadata("design:type", Number)
], PaginatedParamsDto.prototype, "page", void 0);
//# sourceMappingURL=paginated-params.js.map