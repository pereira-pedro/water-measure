import { Exclude, Expose, instanceToPlain } from "class-transformer";
import { User } from "src/domain/authentication/models/user";
import { Address } from "src/domain/address/models/address";
import { AddressPresenter } from "src/presentation/address/presenters/address.presenter";

@Exclude()
export class UserPresenter {
  constructor(partial: Partial<{ user: User; addresses: Address[] }>) {
    if (partial.user) {
      Object.assign(this, partial.user);
    }

    if (partial.addresses) {
      this.addresses = partial.addresses.map((address) => new AddressPresenter(address));
    }
  }

  @Expose()
  id!: string;

  @Expose()
  email!: string;

  @Expose()
  fullName!: string;

  @Expose()
  addresses?: AddressPresenter[];

  createdAt?: Date;
  updatedAt?: Date;

  toJSON() {
    return instanceToPlain(this);
  }
}
