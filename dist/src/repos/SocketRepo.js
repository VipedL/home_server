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
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../generated/prisma");
// **** Functions **** //
const prisma = new prisma_1.PrismaClient();
/**
 * Get one user.
 */
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const sockets = yield prisma.socket.findMany();
        return sockets;
    });
}
function addOne(socket) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.socket.create({
            data: {
                type: socket.type,
                name: socket.name,
                ipAddress: socket.ipAddress,
            },
        });
    });
}
// /**
//  * See if a user with the given id exists.
//  */
// async function persists(id: number): Promise<boolean> {
//   const db = await orm.openDb();
//   for (const user of db.users) {
//     if (user.id === id) {
//       return true;
//     }
//   }
//   return false;
// }
// /**
//  * Get all users.
//  */
// async function getAll(): Promise<IUser[]> {
//   console.log("Getting all users from mock db");
//   const db = await orm.openDb();
//   return db.users;
// }
// /**
//  * Add one user.
//  */
// async function add(user: IUser): Promise<void> {
//   const db = await orm.openDb();
//   user.id = getRandomInt();
//   db.users.push(user);
//   return orm.saveDb(db);
// }
// /**
//  * Update a user.
//  */
// async function update(user: IUser): Promise<void> {
//   const db = await orm.openDb();
//   for (let i = 0; i < db.users.length; i++) {
//     if (db.users[i].id === user.id) {
//       db.users[i] = user;
//       return orm.saveDb(db);
//     }
//   }
// }
// /**
//  * Delete one user.
//  */
// async function delete_(id: number): Promise<void> {
//   const db = await orm.openDb();
//   for (let i = 0; i < db.users.length; i++) {
//     if (db.users[i].id === id) {
//       db.users.splice(i, 1);
//       return orm.saveDb(db);
//     }
//   }
// }
// **** Export default **** //
exports.default = {
    //   getOne,
    //   persists,
    getAll,
    addOne,
    //   update,
    //   delete: delete_,
};
