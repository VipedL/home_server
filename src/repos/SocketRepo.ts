// import { PrismaClient } from "../../generated/prisma/client";
import Socket, { ISocket } from "@src/models/Socket";

const { PrismaClient } = require("../../generated/prisma");
// **** Functions **** //
const prisma = new PrismaClient();
/**
 * Get one user.
 */
async function getAll(): Promise<Array<ISocket>> {
  const sockets = await prisma.socket.findMany();
  return sockets;
}

async function addOne(socket: Partial<Socket>): Promise<void> {
  await prisma.socket.create({
    data: {
      type: socket.type!,
      name: socket.name!,
      ipAddress: socket.ipAddress!,
    },
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

export default {
  //   getOne,
  //   persists,
  getAll,
  addOne,
  //   update,
  //   delete: delete_,
} as const;
