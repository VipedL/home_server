"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
// **** Variables **** //
const SALT_ROUNDS = 12;
// **** Functions **** //
/**
 * Get a hash from the password.
 */
function getHash(pwd) {
    return bcrypt_1.default.hash(pwd, SALT_ROUNDS);
}
/**
 * Useful for testing.
 */
function hashSync(pwd) {
    return bcrypt_1.default.hashSync(pwd, SALT_ROUNDS);
}
/**
 * See if a password passes the hash.
 */
function compare(pwd, hash) {
    return bcrypt_1.default.compare(pwd, hash);
}
// **** Export Default **** //
exports.default = {
    getHash,
    hashSync,
    compare,
};
