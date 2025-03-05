import { FindManyOptions, FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';
import { DBRepository } from '../database.interface';

export class BaseRepository<T extends ObjectLiteral> implements DBRepository<T> {
  constructor(private readonly repo: Repository<T>) {}

  async findOne(where: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T | null> {
    return this.repo.findOne({ where });
  }

  async findMany(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repo.find(options);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async upsertMany(entities: T[], conflictKeys: (keyof T)[]): Promise<void> {
    await this.repo.upsert(entities, conflictKeys as string[]);
  }
}
