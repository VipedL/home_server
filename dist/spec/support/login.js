"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importStar(require("@src/models/User"));
const UserRepo_1 = __importDefault(require("@src/repos/UserRepo"));
const PwdUtil_1 = __importDefault(require("@src/util/PwdUtil"));
const FullPaths_1 = __importDefault(require("@src/routes/constants/FullPaths"));
// **** Variables **** //
const LoginCreds = {
    email: 'jsmith@gmail.com',
    password: 'Password@1',
};
// **** Functions **** //
/**
 * Login a user.
 */
function login(beforeAgent, done) {
    // Setup dummy data
    const role = User_1.UserRoles.Admin, pwdHash = PwdUtil_1.default.hashSync(LoginCreds.password), loginUser = new User_1.default('john smith', LoginCreds.email, role, pwdHash);
    // Add spy
    spyOn(UserRepo_1.default, 'getOne').and.resolveTo(loginUser);
    // Call Login API
    beforeAgent
        .post(FullPaths_1.default.Auth.Login)
        .type('form')
        .send(LoginCreds)
        .end((_, res) => {
        const cookie = res.headers['set-cookie'][0];
        return done(cookie);
    });
}
// **** Export default **** //
exports.default = login;
