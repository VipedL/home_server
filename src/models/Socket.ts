// **** Types **** //
export interface ISocket {
    id: string;
    name: string;
    ipAddress: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
}

class Socket implements ISocket {
  public id: string;
  public name: string;
  public ipAddress: string;
  public type: string;
  public createdAt: Date;
  public updatedAt: Date;

  /**
   * Constructor()
   */
  public constructor(id: string, name: string, ipAddress: string, type: string, createdAt: Date, updatedAt: Date) {
    this.id = id ?? "";
    this.name = name ?? "";
    this.ipAddress = ipAddress ?? "";
    this.type = type ?? "";
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }
  /**
   * Get user instance from object.
   */
  public static from(param: object): Socket {
    if (!Socket.isSocket(param)) {
      throw new Error("INVALID_CONSTRUCTOR_PARAM");
    }
    const p = param as ISocket;
    return new Socket(p.id, p.name, p.ipAddress, p.type, p.createdAt, p.updatedAt);
  }

  /**
   * Is this an object which contains all the user keys.
   */
  public static isSocket(this: void, arg: unknown): boolean {
    return (
      !!arg &&
      typeof arg === "object" &&
      "id" in arg &&
      "name" in arg &&
      "ipAddress" in arg &&
      "type" in arg &&
      "createdAt" in arg &&
      "updatedAt" in arg
    );
  }
}

// **** Export default **** //
export default Socket;
