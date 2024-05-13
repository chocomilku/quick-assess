export interface Game {
	id: number;
	isRunning: number;
	name: string;
}

export interface Category {
	id: number;
	gameId: number;
	text: string;
	points: number;
	color: string;
}

export interface Question {
	id: number;
	gameId: number;
	categoryId: number;
	question: string;
}
