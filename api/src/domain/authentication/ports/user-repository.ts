import { User } from "../models/user";
import { TransactionContext } from "../../transaction/ports/transaction-manager";

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(user: User, tx?: TransactionContext): Promise<User>;
  update(user: User, tx?: TransactionContext): Promise<User>;
  delete(id: string, tx?: TransactionContext): Promise<void>;
}

export const USER_REPOSITORY = Symbol("USER_REPOSITORY");
