"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const HttpStatusCodes_1 = __importDefault(require("@src/constants/HttpStatusCodes"));
const UserService_1 = __importDefault(require("@src/services/UserService"));
// Remove hardcoded secrets - use environment variables instead
// const API_KEY = process.env.GOOGLE_API_KEY;
// const oAuth2Client = new google.auth.OAuth2(
//     process.env.GOOGLE_OAUTH_CLIENT_ID,
//     process.env.GOOGLE_OAUTH_CLIENT_SECRET,
// );
const scopes = [
    'https://www.googleapis.com/auth/calendar'
];
// **** Functions **** //
/**
 * Get all users.
 */
function getAllEvents(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const google = new googleapis_1.GoogleApis();
        const auth = new google.auth.GoogleAuth({
            // Scopes can be specified either as an array or as a single, space-delimited string.
            scopes: [
                'https://www.googleapis.com/auth/calendar',
                'https://www.googleapis.com/auth/calendar.readonly',
            ],
        });
        const authClient = yield auth.getClient();
        google.options({ auth: authClient });
        const calendar = google.calendar({ version: 'v3' });
        console.log(calendar);
        const list = yield calendar.calendarList.list();
        console.log(list);
        const events = [];
        return res.status(HttpStatusCodes_1.default.OK).json({ events });
    });
}
/**
 * Add one user.
 */
function add(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user } = req.body;
        yield UserService_1.default.addOne(user);
        return res.status(HttpStatusCodes_1.default.CREATED).end();
    });
}
/**
 * Update one user.
 */
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user } = req.body;
        yield UserService_1.default.updateOne(user);
        return res.status(HttpStatusCodes_1.default.OK).end();
    });
}
/**
 * Delete one user.
 */
function delete_(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = +req.params.id;
        yield UserService_1.default.delete(id);
        return res.status(HttpStatusCodes_1.default.OK).end();
    });
}
// **** Export default **** //
exports.default = {
    getAllEvents,
    add,
    update,
    delete: delete_,
};
