import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { LogsRepo } from './adapters/driven/logsRepo';
import { LogsService } from './services/logsService';
import { LogsController } from './adapters/driving/logsController';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const repo_Logs = new LogsRepo();
const logs_service = new LogsService(repo_Logs);
const logs_controller = new LogsController(logs_service);

// Test route
app.get('/debug', (req: Request, res: Response) => {
	res.send('API is running');
});

logs_controller.registerRoutes(app);
logs_controller.startLogsConsumer();

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

