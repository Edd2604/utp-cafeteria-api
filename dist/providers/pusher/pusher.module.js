"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PusherModule = void 0;
const common_1 = require("@nestjs/common");
const pusher_provider_1 = require("./pusher.provider");
const pusher_service_1 = require("./pusher.service");
let PusherModule = class PusherModule {
};
exports.PusherModule = PusherModule;
exports.PusherModule = PusherModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [pusher_provider_1.PusherProvider, pusher_service_1.PusherService],
        exports: [pusher_service_1.PusherService],
    })
], PusherModule);
//# sourceMappingURL=pusher.module.js.map