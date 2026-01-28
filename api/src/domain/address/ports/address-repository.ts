import { Address } from "../models/address";

export interface AddressRepository {
  create(address: Address): Promise<Address>;
  update(address: Address): Promise<Address>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Address | null>;
  findAll(params?: { userId?: string | null }): Promise<Address[]>;
}

export const ADDRESS_REPOSITORY = Symbol("ADDRESS_REPOSITORY");
