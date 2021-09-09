export interface IMovieThumbnail {
	poster_path?: string;
	adult: boolean;
	overview: string;
	release_date: string;
	genre_ids: number[];
	id: number;
	original_title: string;
	original_language: string;
	title: string;
	backdrop_path: string | null;
	popularity: number;
	vote_count: number;
	video: boolean;
	vote_average: number;
}

export interface IManyMoviesQuery {
	page: number;
	results: IMovieThumbnail[];
	dates: Record<"minimum" | "maximum", string>;
	total_pages: number;
	total_results: number;
}
