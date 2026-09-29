"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateId = void 0;
const common_1 = require("@nestjs/common");
let ValidateId = class ValidateId {
    transform(value) {
        if (!/^\d+$/.test(value))
            throw new common_1.BadRequestException('El ID debe contener solo números enteros');
        const id = parseInt(value, 10);
        if (isNaN(id) || id <= 0)
            throw new common_1.BadRequestException('El ID debe ser un número positivo');
        return id;
    }
};
exports.ValidateId = ValidateId;
exports.ValidateId = ValidateId = __decorate([
    (0, common_1.Injectable)()
], ValidateId);
//# sourceMappingURL=validate-id.pipe.js.map