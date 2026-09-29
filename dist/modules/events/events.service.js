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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../providers/prisma/prisma.service");
const prisma_exception_1 = require("../../providers/prisma/exceptions/prisma.exception");
let EventsService = class EventsService {
    constructor(db, push) {
        this.db = db;
        this.push = push;
    }
    async saveSubscription(dto) {
        const { userId, subscription } = dto;
        try {
            return this.db.usuario.update({
                where: { id: userId },
                data: {
                    pushSubscription: subscription,
                },
            });
        }
        catch (e) {
            if (e.code) {
                throw new prisma_exception_1.PrismaException(e);
            }
            throw new common_1.InternalServerErrorException('No se pude guardar la subscripcion ');
        }
    }
    async sendNotification(userId, payload) {
        const user = await this.db.usuario.findUnique({
            where: { id: userId },
        });
        if (user?.pushSubscription) {
            const subscription = user.pushSubscription;
            await this.push.sendNotification(subscription, JSON.stringify(payload));
        }
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('WEB_PUSH')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, Object])
], EventsService);
//# sourceMappingURL=events.service.js.map