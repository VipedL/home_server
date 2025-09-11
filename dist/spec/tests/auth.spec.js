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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("@src/server"));
const UserRepo_1 = __importDefault(require("@src/repos/UserRepo"));
const PwdUtil_1 = __importDefault(require("@src/util/PwdUtil"));
const User_1 = __importStar(require("@src/models/User"));
const AuthService_1 = require("@src/services/AuthService");
const FullPaths_1 = __importDefault(require("@src/routes/constants/FullPaths"));
const EnvVars_1 = __importDefault(require("@src/constants/EnvVars"));
const HttpStatusCodes_1 = __importDefault(require("@src/constants/HttpStatusCodes"));
// **** Variables **** //
// Paths
const { Login, Logout, } = FullPaths_1.default.Auth;
// StatusCodes
const { OK, UNAUTHORIZED, } = HttpStatusCodes_1.default;
// Login credentials
const LoginCreds = {
    email: 'jsmith@gmail.com',
    password: 'Password@1',
};
// **** Tests **** //
describe('AuthRouter', () => {
    let agent;
    // Run before all tests
    beforeAll((done) => {
        agent = supertest_1.default.agent(server_1.default);
        done();
    });
    // ** Test login ** //
    describe(`"POST:${Login}"`, () => {
        const EMAIL_NOT_FOUND_ERR = AuthService_1.Errors.EmailNotFound(LoginCreds.email);
        const callApi = (reqBody) => agent
            .post(Login)
            .type('form')
            .send(reqBody);
        // Success
        it(`should return a response with a status of "${OK}" and a cookie with ` +
            'a jwt if the login was successful.', (done) => {
            // Setup data
            const role = User_1.UserRoles.Standard, pwdHash = PwdUtil_1.default.hashSync(LoginCreds.password), loginUser = new User_1.default('john smith', LoginCreds.email, role, pwdHash);
            // Add spy
            spyOn(UserRepo_1.default, 'getOne').and.resolveTo(loginUser);
            // Call API
            callApi(LoginCreds)
                .end((_, res) => {
                expect(res.status).toBe(OK);
                const cookie = res.headers['set-cookie'][0];
                expect(cookie).toContain(EnvVars_1.default.CookieProps.Key);
                done();
            });
        });
        // Email not found error
        it(`should return a response with a status of "${UNAUTHORIZED}" and a ` +
            `json with an error message of "${EMAIL_NOT_FOUND_ERR}" if the email ` +
            'was not found.', (done) => {
            // Spy
            spyOn(UserRepo_1.default, 'getOne').and.resolveTo(null);
            // Call
            callApi(LoginCreds)
                .end((_, res) => {
                expect(res.status).toBe(UNAUTHORIZED);
                expect(res.body.error).toBe(EMAIL_NOT_FOUND_ERR);
                done();
            });
        });
        // Password failed
        it(`should return a response with a status of "${UNAUTHORIZED}" and a ` +
            `json with the error "${AuthService_1.Errors.Unauth}" if the password failed.`, (done) => {
            // Setup data
            const role = User_1.UserRoles.Standard, pwdHash = PwdUtil_1.default.hashSync('bad password'), loginUser = new User_1.default('john smith', LoginCreds.email, role, pwdHash);
            // Add spy
            spyOn(UserRepo_1.default, 'getOne').and.resolveTo(loginUser);
            // Call API
            callApi(LoginCreds)
                .end((_, res) => {
                expect(res.status).toBe(UNAUTHORIZED);
                expect(res.body.error).toBe(AuthService_1.Errors.Unauth);
                done();
            });
        });
    });
    // ** Test logout ** //
    describe(`"GET:${Logout}"`, () => {
        // Successful logout
        it(`should return a response with a status of ${OK}`, (done) => {
            agent.get(Logout)
                .end((_, res) => {
                expect(res.status).toBe(HttpStatusCodes_1.default.OK);
                done();
            });
        });
    });
});
