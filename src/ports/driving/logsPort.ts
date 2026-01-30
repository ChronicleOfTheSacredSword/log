import { Logs } from '../../domain/logs';

export interface LogsPort {
  getLogsByHero(id: number): Promise<Logs | null>;
  getEveryLogs(): Promise<Logs[] | null>;
  createLogs(input: Omit<Logs, 'id'>): Promise<Logs>;
}