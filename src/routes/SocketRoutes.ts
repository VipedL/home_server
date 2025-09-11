import HttpStatusCodes from "@src/constants/HttpStatusCodes";

import { IReq, IRes } from "./types/express/misc";
import SocketsService from "@src/services/SocketService";
import Socket from "@src/models/Socket";

// **** Functions **** //

/**
 * Get all users.
 */
async function getSockets(_: IReq, res: IRes) {
  const data = await SocketsService.getSockets();
  return res.status(HttpStatusCodes.OK).json(data);
}

const addSocket = async (req: IReq<Socket>, res: IRes) => {
  // const {} = req.body;
  console.log("req.body", req.body);
  return SocketsService.addSocket(Socket.from(req.body));
  //   return res
  //     .status(HttpStatusCodes.BAD_REQUEST)
  //     .json({ message: "socketId is required" });
  // const data = (await SocketsService.addSocket(socketId)).data;
  // return res.status(HttpStatusCodes.CREATED).json(data);
};

// **** Export default **** //
export default {
  getSockets,
  addSocket,
} as const;
