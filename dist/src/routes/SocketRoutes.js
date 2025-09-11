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
const HttpStatusCodes_1 = __importDefault(require("@src/constants/HttpStatusCodes"));
const SocketService_1 = __importDefault(require("@src/services/SocketService"));
// **** Functions **** //
/**
 * Get all users.
 */
function getSockets(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = (yield SocketService_1.default.getSockets()).data;
        return res.status(HttpStatusCodes_1.default.OK).json(data);
    });
}
const addSocket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const {} = req.body;
    console.log('req.body', req.body);
    return res
        .status(HttpStatusCodes_1.default.NOT_IMPLEMENTED)
        .json({ message: "Not implemented" });
    //   return res
    //     .status(HttpStatusCodes.BAD_REQUEST)
    //     .json({ message: "socketId is required" });
    // const data = (await SocketsService.addSocket(socketId)).data;
    // return res.status(HttpStatusCodes.CREATED).json(data);
});
// **** Export default **** //
exports.default = {
    getSockets,
    addSocket,
};
