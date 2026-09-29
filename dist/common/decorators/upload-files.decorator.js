"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFile = exports.UploadFiles = void 0;
const common_1 = require("@nestjs/common");
const UploadFiles = () => {
    return (0, common_1.UploadedFiles)(new common_1.ParseFilePipe({
        fileIsRequired: false,
        validators: [new common_1.MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })],
    }));
};
exports.UploadFiles = UploadFiles;
const UploadFile = () => {
    return (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        fileIsRequired: false,
        validators: [new common_1.MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })],
    }));
};
exports.UploadFile = UploadFile;
//# sourceMappingURL=upload-files.decorator.js.map