"use strict";
/**
 * Miscellaneous shared classes go here.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteError = void 0;
/**
 * Error with status code and message
 */
class RouteError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
exports.RouteError = RouteError;
