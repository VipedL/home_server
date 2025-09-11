
// **** Types **** //
export interface IElectricityPrice {
  price: number;
  startDate: string;
  endDate: string;
}

// **** User **** //

class ElectricityPrice implements IElectricityPrice {
  public price: number;
  public startDate: string;
  public endDate: string;

  /**
   * Constructor()
   */
  public constructor(price: number, startDate: string, endDate: string) {
    this.price = price ?? 0;
    this.startDate = startDate ?? "";
    this.endDate = endDate ?? "";
  }
  /**
   * Get user instance from object.
   */
  public static from(param: object): ElectricityPrice {
    if (!ElectricityPrice.isElectricityPrice(param)) {
      throw new Error("INVALID_CONSTRUCTOR_PARAM");
    }
    const p = param as IElectricityPrice;
    return new ElectricityPrice(p.price, p.startDate, p.endDate);
  }

  /**
   * Is this an object which contains all the user keys.
   */
  public static isElectricityPrice(this: void, arg: unknown): boolean {
    return (
      !!arg &&
      typeof arg === "object" &&
      "price" in arg &&
      "startDate" in arg &&
      "endDate" in arg
    );
  }
}

// **** Export default **** //

export default ElectricityPrice;
