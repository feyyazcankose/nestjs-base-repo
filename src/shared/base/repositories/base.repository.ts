import { IBaseRepository } from '@shared/base/interfaces/base.repository.interface';

export class BaseRepository<
  T,
  Delegate extends {
    findUnique(args: any): Promise<T | null>;
    findMany(args?: any): Promise<T[]>;
    create(args: any): Promise<T>;
    update(args: any): Promise<T>;
    delete(args: any): Promise<T>;
  },
> implements IBaseRepository<T>
{
  constructor(private readonly prismaDelegate: Delegate) {}

  async findById(id: string): Promise<T | null> {
    return this.prismaDelegate.findUnique({ where: { id } });
  }

  async findAll(): Promise<T[]> {
    return this.prismaDelegate.findMany();
  }

  async create(data: Partial<T>): Promise<T> {
    return this.prismaDelegate.create({ data });
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    return this.prismaDelegate.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.prismaDelegate.delete({ where: { id } });
  }
}
