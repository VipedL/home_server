"use strict";
// **** Variables **** //
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoles = void 0;
const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' +
    'with the appropriate user keys.';
var UserRoles;
(function (UserRoles) {
    UserRoles[UserRoles["Standard"] = 0] = "Standard";
    UserRoles[UserRoles["Admin"] = 1] = "Admin";
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));
// **** User **** //
class User {
    /**
     * Constructor()
     */
    constructor(name, email, role, pwdHash, id) {
        this.name = (name !== null && name !== void 0 ? name : '');
        this.email = (email !== null && email !== void 0 ? email : '');
        this.role = (role !== null && role !== void 0 ? role : UserRoles.Standard);
        this.pwdHash = (pwdHash !== null && pwdHash !== void 0 ? pwdHash : '');
        this.id = (id !== null && id !== void 0 ? id : -1);
    }
    /**
     * Get user instance from object.
     */
    static from(param) {
        // Check is user
        if (!User.isUser(param)) {
            throw new Error(INVALID_CONSTRUCTOR_PARAM);
        }
        // Get user instance
        const p = param;
        return new User(p.name, p.email, p.role, p.pwdHash, p.id);
    }
    /**
     * Is this an object which contains all the user keys.
     */
    static isUser(arg) {
        return (!!arg &&
            typeof arg === 'object' &&
            'id' in arg &&
            'email' in arg &&
            'name' in arg &&
            'role' in arg);
    }
}
// **** Export default **** //
exports.default = User;
