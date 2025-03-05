import { FindManyOptions, FindOptionsWhere } from 'typeorm';

export interface DBRepository<T> {
  findOne(where: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T | null>;

  findMany(options?: FindManyOptions<T>): Promise<T[]>;

  delete(id: number): Promise<void>;

  upsertMany(entities: T[], conflictKeys: (keyof T)[]): Promise<void>;
}
