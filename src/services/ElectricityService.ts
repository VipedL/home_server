import axios, {AxiosResponse} from 'axios';


// **** Variables **** //

// Errors
export const Errors = {
  Unauth: 'Unauthorized',
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
async function getElectricityData(): Promise<AxiosResponse<ElectricityApiResponse>> {
    return axios.get('https://api.porssisahko.net/v1/latest-prices.json')   
}

// **** Export default **** //
export default {
  getElectricityData,
} as const;
