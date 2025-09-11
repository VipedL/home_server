"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Socket {
    /**
     * Constructor()
     */
    constructor(id, name, ipAddress, type, createdAt, updatedAt) {
        this.id = id !== null && id !== void 0 ? id : "";
        this.name = name !== null && name !== void 0 ? name : "";
        this.ipAddress = ipAddress !== null && ipAddress !== void 0 ? ipAddress : "";
        this.type = type !== null && type !== void 0 ? type : "";
        this.createdAt = createdAt !== null && createdAt !== void 0 ? createdAt : new Date();
        this.updatedAt = updatedAt !== null && updatedAt !== void 0 ? updatedAt : new Date();
    }
    /**
     * Get user instance from object.
     */
    static from(param) {
        if (!Socket.isSocket(param)) {
            throw new Error("INVALID_CONSTRUCTOR_PARAM");
        }
        const p = param;
        return new Socket(p.id, p.name, p.ipAddress, p.type, p.createdAt, p.updatedAt);
    }
    /**
     * Is this an object which contains all the user keys.
     */
    static isSocket(arg) {
        return (!!arg &&
            typeof arg === "object" &&
            "id" in arg &&
            "name" in arg &&
            "ipAddress" in arg &&
            "type" in arg &&
            "createdAt" in arg &&
            "updatedAt" in arg);
    }
}
// **** Export default **** //
exports.default = Socket;
