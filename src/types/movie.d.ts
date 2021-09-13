import { IGenre } from "./genre";

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

export interface IManyMoviesArgs {
	path: string;
	errorMsg?: string;
	params: IParams;
}

export interface IPRoductionCompany {
	name: string;
	id: number;
	logo_path: string | null;
	origin_country: string;
}

export interface IProductionCountry {
	iso_3166_1: string;
	name: string;
}

export interface ISpokenLanguage {
	iso_639_1: string;
	name: string;
}

export type IMovieStatus =
	| "Rumored"
	| "Planned"
	| "In Production"
	| "Post Production"
	| "Released"
	| "Canceled";

export interface ISingleMovie {
	adult: boolean;
	backdrop_path: string | null;
	belongs_to_collection: null | object;
	budget: number;
	genres: IGenre[];
	homepage: string | null;
	id: number;
	imdb_id: string | null;
	original_language: string;
	original_title: string;
	overview: string | null;
	popularity: number;
	poster_path: string | null;
	production_companies: IPRoductionCompany[];
	production_countries: IProductionCountry[];
	release_date: string;
	revenue: number;
	runtime: number | null;
	spoken_languages: ISpokenLanguage[];
	status: IMovieStatus;
	tagline: string | null;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface IPerson {
	adult: boolean;
	gender: number | null;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string | null;
	credit_id: string;
}

export interface ICast extends IPerson {
	cast_id: number;
	character: string;
	order: number;
}

export interface ICrew extends IPerson {
	department: string;
	job: string;
}

export interface IMovieCredits {
	id: number;
	cast: ICast[];
	crew: ICrew[];
}

export interface IParams {
	page?: number;
	with_genre?: string;
	query?: string | null | undefined;
	[key: string]: any;
}
