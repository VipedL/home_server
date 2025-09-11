import axios, { AxiosResponse } from "axios";

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
async function getSockets(): Promise<AxiosResponse<any>> {
  return axios.get("https://api.porssisahko.net/v1/latest-prices.json");
}

// **** Export default **** //
export default {
  getSockets,
} as const;
