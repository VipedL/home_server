import HttpStatusCodes from "@src/constants/HttpStatusCodes";

import { IReq, IRes } from "./types/express/misc";
import SocketsService from "@src/services/SocketService";

// **** Functions **** //

/**
 * Get all users.
 */
async function getSockets(_: IReq, res: IRes) {
  const data = (await SocketsService.getSockets()).data;
  return res.status(HttpStatusCodes.OK).json(data);
}

// **** Export default **** //
export default {
  getSockets,
} as const;
