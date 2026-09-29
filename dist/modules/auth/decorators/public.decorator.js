"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicAccess = exports.PUBLIC_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.PUBLIC_KEY = 'PUBLIC';
const PublicAccess = () => (0, common_1.SetMetadata)('PUBLIC', true);
exports.PublicAccess = PublicAccess;
//# sourceMappingURL=public.decorator.js.map