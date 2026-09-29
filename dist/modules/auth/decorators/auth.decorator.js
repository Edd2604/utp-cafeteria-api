"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = Auth;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../guards/auth.guard");
const roles_guard_1 = require("../guards/roles.guard");
const roles_decorator_1 = require("./roles.decorator");
function Auth(roles) {
    return (0, common_1.applyDecorators)((0, roles_decorator_1.Roles)(roles), (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard));
}
//# sourceMappingURL=auth.decorator.js.map