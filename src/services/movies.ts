import { IManyMoviesQuery, IMovie } from "../types/movie";
import { IGenre } from "../types/genre";
import axios from "axios";

async function getManyMovies(path: string, errorMsg: string, page?: number) {
	const params: any = {};
	if (page) params.page = page;
	try {
		const { data } = await axios.get<IManyMoviesQuery>(path, { params });
		return data;
	} catch (error) {
		console.error(errorMsg);
		return null;
	}
}

export async function getMoviesByGenres(genres: IGenre[]) {
	const { data } = await axios.get<IMovie[]>("/discover/movie", {
		params: { with_genres: genres.map(genre => String(genre.id)).join(",") },
	});
	return data;
}

export async function getLatestMovies(page?: number) {
	return await getManyMovies("/movie/now_playing", "Failed fetching latest movies.", page);
}

export async function getPopularMovies(page?: number) {
	return await getManyMovies("/movie/popular", "Failed fetching most popular movies.", page);
}

export async function getTopMovies(page?: number) {
	return await getManyMovies("/movie/top_rated", "Failed fetching top rated movies.", page);
}
