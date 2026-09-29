"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = formatDate;
exports.formatDateCalendar = formatDateCalendar;
const date_fns_1 = require("date-fns");
const date_fns_tz_1 = require("date-fns-tz");
function formatDate(date) {
    if (!date || isNaN(date.getTime()))
        return null;
    const zonedDate = (0, date_fns_tz_1.toZonedTime)(date, 'America/Lima');
    return (0, date_fns_1.format)(zonedDate, 'dd-MM-yyyy HH:mm');
}
function formatDateCalendar(date) {
    const zonedDate = (0, date_fns_tz_1.toZonedTime)(date, 'America/Lima');
    return (0, date_fns_1.format)(zonedDate, 'dd-MM-yyyy');
}
//# sourceMappingURL=format-date.js.map