import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import amqp from 'amqplib';
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

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

export async function startLogsConsumer(service_logs: any) {
  	const connection = await amqp.connect('amqp://microservice:microservice@localhost:5672');

	const channel = await connection.createChannel();
	const queue = 'logs_queue';

	await channel.assertQueue(queue, { durable: true });

	channel.consume(queue, async (msg: any) => {
		if (!msg) return;

		try {
			const payload = JSON.parse(msg.content.toString());
			await service_logs.createLogs(payload);
			console.log("J'AI RECU LE MSG", payload);
			channel.ack(msg);
		} catch (err) {
			console.error('Failed to process log message', err);
			channel.nack(msg, false, false); // discard
		}
	});
}

startLogsConsumer(logs_service);

