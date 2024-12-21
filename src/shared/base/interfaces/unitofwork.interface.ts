export interface IUnitOfWork {
  beginTransaction(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
  work<T>(callback: () => Promise<T>, exception?: string): Promise<T>;
}
