"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const reniec_module_1 = require("./providers/reniec/reniec.module");
const prisma_module_1 = require("./providers/prisma/prisma.module");
const schedule_1 = require("@nestjs/schedule");
const orders_module_1 = require("./modules/orders/orders.module");
const cloudinary_module_1 = require("./providers/cloudinary/cloudinary.module");
const pusher_module_1 = require("./providers/pusher/pusher.module");
const users_module_1 = require("./modules/users/users.module");
const products_module_1 = require("./modules/products/products.module");
const auth_module_1 = require("./modules/auth/auth.module");
const inventory_module_1 = require("./modules/inventory/inventory.module");
const payments_module_1 = require("./modules/payments/payments.module");
const events_module_1 = require("./modules/events/events.module");
const vapid_service_1 = require("./providers/vapid/vapid.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            reniec_module_1.ReniecModule,
            prisma_module_1.PrismaModule,
            users_module_1.UsersModule,
            orders_module_1.OrdersModule,
            pusher_module_1.PusherModule,
            products_module_1.ProductsModule,
            cloudinary_module_1.CloudinaryModule,
            auth_module_1.AuthModule,
            inventory_module_1.InventoryModule,
            schedule_1.ScheduleModule.forRoot(),
            payments_module_1.PaymentsModule,
            events_module_1.EventsModule,
        ],
        controllers: [],
        providers: [vapid_service_1.VapidService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map