"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ElectricityPrice {
    /**
     * Constructor()
     */
    constructor(price, startDate, endDate) {
        this.price = price !== null && price !== void 0 ? price : 0;
        this.startDate = startDate !== null && startDate !== void 0 ? startDate : "";
        this.endDate = endDate !== null && endDate !== void 0 ? endDate : "";
    }
    /**
     * Get user instance from object.
     */
    static from(param) {
        if (!ElectricityPrice.isElectricityPrice(param)) {
            throw new Error("INVALID_CONSTRUCTOR_PARAM");
        }
        const p = param;
        return new ElectricityPrice(p.price, p.startDate, p.endDate);
    }
    /**
     * Is this an object which contains all the user keys.
     */
    static isElectricityPrice(arg) {
        return (!!arg &&
            typeof arg === "object" &&
            "price" in arg &&
            "startDate" in arg &&
            "endDate" in arg);
    }
}
// **** Export default **** //
exports.default = ElectricityPrice;
