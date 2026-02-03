import { Exclude, Expose, instanceToPlain } from "class-transformer";
import { Address } from "src/domain/address/models/address";

@Exclude()
export class AddressPresenter {
  constructor(partial: Partial<Address>) {
    Object.assign(this, partial);
  }

  @Expose()
  id!: string;

  @Expose()
  userId!: string;

  @Expose()
  street!: string;

  @Expose()
  streetNumber!: string;

  @Expose()
  neighborhood!: string | null;

  @Expose()
  city!: string;

  @Expose()
  province!: string;

  @Expose()
  postalCode!: string;

  @Expose()
  country!: string;

  @Expose()
  location!: Address["location"];

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;

  toJSON() {
    return instanceToPlain(this);
  }
}
