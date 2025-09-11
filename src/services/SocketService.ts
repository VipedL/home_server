import axios, { AxiosResponse } from "axios";
import SocketRepo from "@src/repos/SocketRepo";
import Socket, { ISocket } from "@src/models/Socket";

// **** Variables **** //

// Errors
export const Errors = {
  Unauth: "Unauthorized",
  EmailNotFound(email: string) {
    return `User with email "${email}" not found`;
  },
} as const;

// **** Functions **** //

/**
 * Get electricity data.
 */
async function getSockets(): Promise<ISocket[]> {
  return await SocketRepo.getAll();
}

const addSocket = async (socket: Socket): Promise<any> => {
  await SocketRepo.addOne(socket);
  return;
};

// **** Export default **** //
export default {
  getSockets,
  addSocket,
} as const;
