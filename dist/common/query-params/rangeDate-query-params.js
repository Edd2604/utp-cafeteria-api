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
exports.RangeDateQueryParams = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const date_fns_1 = require("date-fns");
const paginated_params_1 = require("./paginated-params");
class RangeDateQueryParams extends paginated_params_1.PaginatedParamsDto {
}
exports.RangeDateQueryParams = RangeDateQueryParams;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Rango inicial de fechas',
        format: 'yyyy-MM-dd',
        type: 'string',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!value)
            return null;
        if (value instanceof Date)
            return value;
        const date = (0, date_fns_1.parse)(value, 'yyyy-MM-dd', new Date());
        if (!(0, date_fns_1.isValid)(date)) {
            throw new common_1.BadRequestException(`El parámetro de fecha inicial no es una fecha válida. Usa el formato yyyy-MM-dd.`);
        }
        return date;
    }),
    __metadata("design:type", String)
], RangeDateQueryParams.prototype, "start_date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Rango Final de fechas',
        format: 'yyyy-MM-dd',
        type: 'string',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!value)
            return null;
        if (value instanceof Date)
            return value;
        const date = (0, date_fns_1.parse)(value, 'yyyy-MM-dd', new Date());
        if (!(0, date_fns_1.isValid)(date)) {
            throw new common_1.BadRequestException(`El parámetro fecha final no es una fecha válida. Usa el formato yyyy-MM-dd.`);
        }
        return date;
    }),
    __metadata("design:type", String)
], RangeDateQueryParams.prototype, "end_date", void 0);
//# sourceMappingURL=rangeDate-query-params.js.map