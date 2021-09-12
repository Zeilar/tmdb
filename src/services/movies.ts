import { IManyMoviesQuery, IManyMoviesArgs, IParams } from "../types/movie";
import { IGenre } from "../types/genre";
import axios from "axios";

async function getManyMovies({ path, errorMsg, params }: IManyMoviesArgs) {
	try {
		const { data } = await axios.get<IManyMoviesQuery>(path, { params });
		return data;
	} catch (error) {
		console.error(errorMsg);
		return null;
	}
}

export async function getMoviesByDiscover({ with_genres, page }: IParams) {
	return await getManyMovies({
		path: "/discover/movie",
		errorMsg: "Failed fetching movies.",
		params: {
			with_genres,
			page,
		},
	});
}

export async function getLatestMovies(page?: number) {
	return await getManyMovies({
		path: "/movie/now_playing",
		errorMsg: "Failed fetching latest movies.",
		params: { page },
	});
}

export async function getPopularMovies(page?: number) {
	return await getManyMovies({
		path: "/movie/popular",
		errorMsg: "Failed fetching most popular movies.",
		params: { page },
	});
}

export async function getTopMovies(page?: number) {
	return await getManyMovies({
		path: "/movie/top_rated",
		errorMsg: "Failed fetching top rated movies.",
		params: { page },
	});
}
