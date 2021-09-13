import {
	IManyMoviesQuery,
	IManyMoviesArgs,
	IParams,
	ISingleMovie,
	IMovieCredits,
} from "../types/movie";
import axios from "axios";

async function getManyMovies({
	path,
	errorMsg = "Failed fetching movies.",
	params,
}: IManyMoviesArgs) {
	try {
		const { data } = await axios.get<IManyMoviesQuery>(path, { params });
		return data;
	} catch (error) {
		console.error(errorMsg);
		return null;
	}
}

export async function getMoviesBySearch({ query, page }: IParams) {
	return await getManyMovies({
		path: "/search/movie",
		errorMsg: "Failed fetching movies by search query.",
		params: {
			query,
			page,
		},
	});
}

export async function getMoviesByGenres({ with_genres, page }: IParams) {
	return await getManyMovies({
		path: "/discover/movie",
		errorMsg: "Failed fetching movies by genres.",
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

export async function getMovieById(id: number) {
	try {
		const movieQuery = await axios.get<ISingleMovie>(`/movie/${id}`);
		const creditsQuery = await axios.get<IMovieCredits>(`/movie/${id}/credits`);
		return {
			movie: movieQuery.data,
			credits: creditsQuery.data,
		};
	} catch (error) {
		console.error(`Failed fetching movie with id ${id}.`);
	}
}
