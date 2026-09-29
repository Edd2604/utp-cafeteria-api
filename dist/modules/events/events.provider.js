"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebPushProvider = void 0;
const envs_1 = require("../../config/envs");
const webPush = require("web-push");
exports.WebPushProvider = {
    provide: 'WEB_PUSH',
    useFactory: () => {
        webPush.setVapidDetails('mailto:eddie.ehc04@gmail.com', envs_1.envs.vapidPublicKey, envs_1.envs.vapidPrivateKey);
        return webPush;
    },
};
//# sourceMappingURL=events.provider.js.map