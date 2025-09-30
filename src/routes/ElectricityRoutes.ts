import HttpStatusCodes from "@src/constants/HttpStatusCodes";

import { IReq, IRes } from "./types/express/misc";
import ElectricityService from "@src/services/ElectricityService";

// **** Functions **** //

/**
 * Get all users.
 */
async function getAll(_: IReq, res: IRes) {
  const data = (await ElectricityService.getAll());
  return res.status(HttpStatusCodes.OK).json(data);
}

// **** Export default **** //
export default {
  getAll,
} as const;
