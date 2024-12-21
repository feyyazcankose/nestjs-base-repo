import { Injectable } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { IUnitOfWork } from '@shared/base/interfaces/unitofwork.interface';

@Injectable()
export class UnitOfWork implements IUnitOfWork {
  private transactionClient: Prisma.TransactionClient | null = null;

  constructor(private readonly prisma: PrismaClient) {}

  async beginTransaction(): Promise<void> {
    if (this.transactionClient) {
      throw new Error('Transaction already started.');
    }
    this.transactionClient = await this.prisma.$transaction(
      async (client) => client,
    );
  }

  async commit(): Promise<void> {
    if (!this.transactionClient) {
      throw new Error('No transaction to commit.');
    }
    this.transactionClient = null;
  }

  async rollback(): Promise<void> {
    if (!this.transactionClient) {
      throw new Error('No transaction to rollback.');
    }
    this.transactionClient = null;
  }

  async work<T>(callback: () => Promise<T>, exception = 'default'): Promise<T> {
    let response: T;

    await this.beginTransaction();

    try {
      response = await callback();
      await this.commit();
    } catch (error) {
      await this.rollback();

      if (exception !== 'default') {
        throw new Error(exception);
      }

      throw error;
    }

    return response;
  }
}
