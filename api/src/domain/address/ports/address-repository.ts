import { Address } from "../models/address";
import { TransactionContext } from "../../transaction/ports/transaction-manager";

export interface AddressRepository {
  create(address: Address, tx?: TransactionContext): Promise<Address>;
  update(address: Address, tx?: TransactionContext): Promise<Address>;
  delete(id: string, tx?: TransactionContext): Promise<number>;
  findById(id: string): Promise<Address | null>;
  findAll(params?: { userId?: string | null }): Promise<Address[]>;
  countByUserId(userId: string, tx?: TransactionContext): Promise<number>;
}

export const ADDRESS_REPOSITORY = Symbol("ADDRESS_REPOSITORY");
