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
exports.OrdersQueryParams = void 0;
const search_query_params_1 = require("../../../common/query-params/search-query-params");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class OrdersQueryParams extends search_query_params_1.SearchQueryParamsDto {
}
exports.OrdersQueryParams = OrdersQueryParams;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: client_1.Estado,
        default: '',
        description: 'Estado de la orden',
    }),
    (0, class_validator_1.IsEnum)(client_1.Estado),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrdersQueryParams.prototype, "status", void 0);
//# sourceMappingURL=orders-query-params.js.map