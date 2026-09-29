"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseFilesInterceptor = UseFilesInterceptor;
exports.UseFileInterceptor = UseFileInterceptor;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
function UseFilesInterceptor() {
    return (0, common_1.applyDecorators)((0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')));
}
function UseFileInterceptor() {
    return (0, common_1.applyDecorators)((0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')));
}
//# sourceMappingURL=file-interceptor.decorator.js.map