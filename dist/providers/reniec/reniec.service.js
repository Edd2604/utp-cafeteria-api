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
exports.ReniecService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const envs_1 = require("../../config/envs");
let ReniecService = class ReniecService {
    constructor(http) {
        this.http = http;
    }
    async getInfoDNI(dni) {
        const url = `https://api.apis.net.pe/v2/reniec/dni?numero=${dni}`;
        try {
            const response = await (0, rxjs_1.lastValueFrom)(this.http.get(url, {
                headers: {
                    Authorization: `Bearer ${envs_1.envs.reniecToken}`,
                    'Content-Type': 'application/json',
                },
            }));
            return response.data;
        }
        catch (e) {
            console.warn(e);
            throw new common_1.NotFoundException('El DNI no existe');
        }
    }
};
exports.ReniecService = ReniecService;
exports.ReniecService = ReniecService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], ReniecService);
//# sourceMappingURL=reniec.service.js.map