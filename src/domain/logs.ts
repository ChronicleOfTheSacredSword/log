export class Logs {
	id?: number;
	id_hero: number;
	content: string;

	constructor(id_hero: number, content: string, id?: number) {
		this.id = id;
		this.id_hero = id_hero;
		this.content = content;
	}
}
