"use strict";
/**
 * Setup express server.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const jet_logger_1 = __importDefault(require("jet-logger"));
const cors_1 = __importDefault(require("cors"));
require("express-async-errors");
const api_1 = __importDefault(require("@src/routes/api"));
const Paths_1 = __importDefault(require("@src/routes/constants/Paths"));
const EnvVars_1 = __importDefault(require("@src/constants/EnvVars"));
const HttpStatusCodes_1 = __importDefault(require("@src/constants/HttpStatusCodes"));
const misc_1 = require("@src/constants/misc");
const classes_1 = require("@src/other/classes");
// **** Variables **** //
const app = (0, express_1.default)();
// **** Setup **** //
// Basic middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)(EnvVars_1.default.CookieProps.Secret));
app.use((0, cors_1.default)());
// Show routes called in console during development
if (EnvVars_1.default.NodeEnv === misc_1.NodeEnvs.Dev) {
    app.use((0, morgan_1.default)('dev'));
}
// Security
if (EnvVars_1.default.NodeEnv === misc_1.NodeEnvs.Production) {
    app.use((0, helmet_1.default)());
}
// Add APIs, must be after middleware
app.use(Paths_1.default.Base, api_1.default);
// Add error handler
app.use((err, _, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    if (EnvVars_1.default.NodeEnv !== misc_1.NodeEnvs.Test) {
        jet_logger_1.default.err(err, true);
    }
    let status = HttpStatusCodes_1.default.BAD_REQUEST;
    if (err instanceof classes_1.RouteError) {
        status = err.status;
    }
    return res.status(status).json({ error: err.message });
});
// ** Front-End Content ** //
// Set views directory (html)
const viewsDir = path_1.default.join(__dirname, 'views');
app.set('views', viewsDir);
// Set static directory (js and css).
const staticDir = path_1.default.join(__dirname, 'public');
app.use(express_1.default.static(staticDir));
// Nav to login pg by default
app.get('/', (_, res) => {
    res.sendFile('login.html', { root: viewsDir });
});
// Redirect to login if not logged in.
app.get('/users', (req, res) => {
    const jwt = req.signedCookies[EnvVars_1.default.CookieProps.Key];
    if (!jwt) {
        res.redirect('/');
    }
    else {
        res.sendFile('users.html', { root: viewsDir });
    }
});
// **** Export default **** //
exports.default = app;
