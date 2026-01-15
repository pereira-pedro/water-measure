export interface StatusRepository {
  getDatabaseNow(): Promise<Date | null>;
  showTables(): Promise<string[]>;
}
