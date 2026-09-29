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
exports.ProductsQueryParams = void 0;
const search_query_params_1 = require("../../../common/query-params/search-query-params");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var OrderProducts;
(function (OrderProducts) {
    OrderProducts["asc"] = "asc";
    OrderProducts["desc"] = "desc";
})(OrderProducts || (OrderProducts = {}));
class ProductsQueryParams extends search_query_params_1.SearchQueryParamsDto {
}
exports.ProductsQueryParams = ProductsQueryParams;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: client_1.Categoria,
        default: '',
        description: 'Categoria de productos',
    }),
    (0, class_validator_1.IsEnum)(client_1.Categoria),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ProductsQueryParams.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Precio máximo de productos',
        type: 'number',
    }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ProductsQueryParams.prototype, "max_price", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: OrderProducts,
        default: '',
        description: 'Orden de productos por precio',
    }),
    (0, class_validator_1.IsEnum)(OrderProducts),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ProductsQueryParams.prototype, "order", void 0);
//# sourceMappingURL=products-query-params.js.map