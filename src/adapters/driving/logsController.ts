import { Express, Request, Response } from 'express';
import { LogsService } from '../../services/logsService';

export class LogsController {
	private service_logs: LogsService;

	constructor(private readonly logsService: LogsService) {
		this.service_logs = logsService;
	}

	registerRoutes(app: Express) {
		app.get('/logs', this.getEveryLogs.bind(this));
		app.get('/logs/hero/:id', this.getLogsByHero.bind(this));
		app.post('/logs', this.createLogs.bind(this));
	}

	async getLogsByHero(req: Request, res: Response) {
		const id = Number(req.params.id);
		const log = await this.service_logs.getLogsByHero(id);
		if (!log) return res.status(404).json({ message: 'Hero Not found' });
		res.json(log);
	}

	async getEveryLogs(req: Request, res: Response) {
		const logs = await this.service_logs.getEveryLogs();
		res.json(logs);
	}

	async createLogs(req: Request, res: Response) {
		const log = await this.service_logs.createLogs(req.body);
		res.json(log);
	}
}