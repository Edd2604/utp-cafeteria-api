"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractStudentCode = extractStudentCode;
function extractStudentCode(correo) {
    const match = correo.match(/^([Uu]\d{8})@.*utp\.edu\.pe$/i);
    return match ? match[1] : null;
}
//# sourceMappingURL=extract-code.js.map