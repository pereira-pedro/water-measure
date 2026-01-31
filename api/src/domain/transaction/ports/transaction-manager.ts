export type TransactionContext = unknown;

export interface TransactionManager {
  run<T>(fn: (tx: TransactionContext) => Promise<T>): Promise<T>;
}

export const TRANSACTION_MANAGER = Symbol("TRANSACTION_MANAGER");
