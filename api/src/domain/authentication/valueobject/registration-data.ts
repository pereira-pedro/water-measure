import { User } from "src/domain/authentication/models/user";
import { Address } from "src/domain/address/models/address";

export class RegistrationData {
  public user?: User;
  public address?: Address;
  public agreedToTerms?: boolean;

  constructor(params: { user?: any; address?: any; agreedToTerms?: boolean }) {
    this.user = params.user;
    this.address = params.address;
    this.agreedToTerms = params.agreedToTerms;
  }

  public merge(data: Partial<any>): void {
    if (data?.user) {
      this.user = this.mergeUserData(data.user);
    }
    if (data?.address) {
      this.address = this.mergeAddressData(data.address);
    }
    if (data?.agreedToTerms !== undefined) {
      this.agreedToTerms = data.agreedToTerms;
    }
  }

  private mergeUserData(data: any): User {
    return this.pick<User, keyof User>(data, User.fillable(), this.user);
  }

  private mergeAddressData(data: any): Address {
    return this.pick<Address, keyof Address>(data, Address.fillable(), this.address);
  }

  private pick<T extends object, K extends keyof T>(src: Partial<T>, keys: K[], base?: T): T {
    const out = { ...(base ?? {}) } as T;
    for (const k of keys) {
      if (src[k] === undefined) {
        continue;
      }

      out[k] = src[k] as T[K];
    }
    return out;
  }
}
