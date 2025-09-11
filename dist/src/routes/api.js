"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jet_validator_1 = __importDefault(require("jet-validator"));
const Paths_1 = __importDefault(require("./constants/Paths"));
const User_1 = __importDefault(require("@src/models/User"));
// import Electricity from '@src/models/Electricity';
const AuthRoutes_1 = __importDefault(require("./AuthRoutes"));
const UserRoutes_1 = __importDefault(require("./UserRoutes"));
const CalendarRoutes_1 = __importDefault(require("./CalendarRoutes"));
const ElectricityRoutes_1 = __importDefault(require("./ElectricityRoutes"));
const SocketRoutes_1 = __importDefault(require("./SocketRoutes"));
// **** Variables **** //
const apiRouter = (0, express_1.Router)(), validate = (0, jet_validator_1.default)();
// **** Setup **** //
const authRouter = (0, express_1.Router)();
const electricityRouter = (0, express_1.Router)();
const socketRouter = (0, express_1.Router)();
// Login user
authRouter.post(Paths_1.default.Auth.Login, validate('email', 'password'), AuthRoutes_1.default.login);
// Logout user
authRouter.get(Paths_1.default.Auth.Logout, AuthRoutes_1.default.logout);
// Add AuthRouter
apiRouter.use(Paths_1.default.Auth.Base, authRouter);
// ** Add UserRouter ** //
const userRouter = (0, express_1.Router)();
// Get all users
userRouter.get(Paths_1.default.Users.Get, UserRoutes_1.default.getAll);
// Add one user
userRouter.post(Paths_1.default.Users.Add, validate(['user', User_1.default.isUser]), UserRoutes_1.default.add);
// Update one user
userRouter.put(Paths_1.default.Users.Update, validate(['user', User_1.default.isUser]), UserRoutes_1.default.update);
// Delete one user
userRouter.delete(Paths_1.default.Users.Delete, validate(['id', 'number', 'params']), UserRoutes_1.default.delete);
const calendarRouter = (0, express_1.Router)();
calendarRouter.get(Paths_1.default.Calendar.GetAllEvents, CalendarRoutes_1.default.getAllEvents);
electricityRouter.get(Paths_1.default.Electricity.GetData, ElectricityRoutes_1.default.getElectricityData);
socketRouter.get(Paths_1.default.Sockets.GetAll, SocketRoutes_1.default.getSockets);
socketRouter.post(Paths_1.default.Sockets.Add, SocketRoutes_1.default.addSocket);
console.log(Paths_1.default.Calendar.GetAllEvents);
// Add UserRouter
// apiRouter.use(Paths.Users.Base, adminMw, userRouter);
apiRouter.use(Paths_1.default.Users.Base, userRouter);
apiRouter.use(Paths_1.default.Calendar.Base, calendarRouter);
apiRouter.use(Paths_1.default.Electricity.Base, electricityRouter);
apiRouter.use(Paths_1.default.Sockets.Base, socketRouter);
// **** Export default **** //
exports.default = apiRouter;
