import HttpStatusCodes from "@src/constants/HttpStatusCodes";

import { IReq, IRes } from "./types/express/misc";
import ElectricityService from "@src/services/ElectricityService";

// **** Functions **** //

/**
 * Get all users.
 */
async function getElectricityData(_: IReq, res: IRes) {
  const data = (await ElectricityService.getElectricityData()).data;
  return res.status(HttpStatusCodes.OK).json(data);
}

// **** Export default **** //
export default {
  getElectricityData,
} as const;
