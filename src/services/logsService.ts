import { Logs } from '../domain/logs';
import { LogsRepositoryPort } from '../ports/driven/logsRepositoryPort';
import { LogsPort } from "../ports/driving/logsPort";

export class LogsService implements LogsPort {
  	constructor(private repo: LogsRepositoryPort) {}

	async getLogsByHero(id: number): Promise<Logs | null>{
		return this.repo.findByIdHero(id);
	}

	async getEveryLogs(): Promise<Logs[] | null>{
		return this.repo.findAll();
	}
  
	async createLogs(input: Omit<Logs, 'id'>): Promise<Logs>{
		return this.repo.save(input);
	}
}
