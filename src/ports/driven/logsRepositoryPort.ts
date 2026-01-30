import { Logs } from '../../domain/logs';

export interface LogsRepositoryPort {
  findByIdHero(id: number): Promise<Logs | null>;
  findAll(): Promise<Logs[] | null>;
  save(input: Omit<Logs, 'id'>): Promise<Logs>;
}