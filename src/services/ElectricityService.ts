import { IElectricityPrice } from "@src/models/ElectricityPrice";
import ElectricityPriceRepo from "@src/repos/ElectricityPriceRepo";

// **** Variables **** //

// Errors
export const Errors = {
  Unauth: "Unauthorized",
  EmailNotFound(email: string) {
    return `User with email "${email}" not found`;
  },
} as const;

type ElectricityData = {
  price: number;
  startDate: string;
  endDate: string;
};

type ElectricityApiResponse = {
  prices: ElectricityData[];
};

// **** Functions **** //

/**
 * Get electricity data.
 */
async function getAll(): Promise<Array<IElectricityPrice>> {
  try {
    return await ElectricityPriceRepo.getAll();
  } catch (error) {
    console.error("Error fetching electricity data:", error);
    throw error;
  }
}

// **** Export default **** //
export default {
  getAll,
} as const;
