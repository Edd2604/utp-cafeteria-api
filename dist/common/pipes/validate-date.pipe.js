"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateDate = void 0;
const common_1 = require("@nestjs/common");
const date_fns_1 = require("date-fns");
let ValidateDate = class ValidateDate {
    transform(value) {
        const date = (0, date_fns_1.parse)(value, 'yyyy-MM-dd', new Date());
        if (!(0, date_fns_1.isValid)(date)) {
            throw new common_1.BadRequestException(`La fecha "${value}" no es válida. Usa el formato yyyy-MM-dd`);
        }
        return date;
    }
};
exports.ValidateDate = ValidateDate;
exports.ValidateDate = ValidateDate = __decorate([
    (0, common_1.Injectable)()
], ValidateDate);
//# sourceMappingURL=validate-date.pipe.js.map