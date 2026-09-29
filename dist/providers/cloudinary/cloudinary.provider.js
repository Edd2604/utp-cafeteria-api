"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryProvider = void 0;
const cloudinary_1 = require("cloudinary");
const envs_1 = require("../../config/envs");
exports.CloudinaryProvider = {
    provide: 'Cloudinary',
    useFactory: () => {
        return cloudinary_1.v2.config({
            cloud_name: envs_1.envs.cloudinaryName,
            api_key: envs_1.envs.cloudinaryApiKey,
            api_secret: envs_1.envs.cloudinaryApiSecret,
        });
    },
};
//# sourceMappingURL=cloudinary.provider.js.map