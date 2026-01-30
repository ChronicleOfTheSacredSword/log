import { Logs } from '../../domain/logs';
import { LogsRepositoryPort } from '../../ports/driven/logsRepositoryPort';
import pool from './db';

export class LogsRepo implements LogsRepositoryPort {
	async findByIdHero(id: number): Promise<Logs | null> {
		const res = await pool.query(
			`
			SELECT
				id,
				logs_date,
				id_hero,
				content
			FROM logs_services
			WHERE id_hero = $1
			`,
			[id]
		);

		return res.rows[0] ?? null;
	}

	async findAll(): Promise<Logs[] | null> {
		const res = await pool.query(
			`
			SELECT
				id,
				logs_date,
				id_hero,
				content
			FROM logs_services
			ORDER BY id DESC
			`
		);

		return res.rows ?? null;
	}

  	async save(log: Omit<Logs, 'id'>): Promise<Logs> {
		const res = await pool.query(
			`
			INSERT INTO logs_services (
				logs_date,
				id_hero,
				content
			)
			VALUES (
				NOW(),
				$1, 
				$2
			)
			RETURNING
				id,
				logs_date,
				id_hero,
				content
			`,
			[
				log.id_hero,
				log.content
			]
		);

		return res.rows[0];
  	}
}
