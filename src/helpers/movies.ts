import { IManyMoviesQuery, IMovieThumbnail, ISingleMovie } from "../types";
import { InfiniteData } from "react-query";

export function flattenMoviesQuery(data?: InfiniteData<IManyMoviesQuery | null> | undefined) {
	if (!data?.pages) {
		return [];
	}
	const movies: IMovieThumbnail[] = [];
	data.pages.forEach(page => {
		if (page?.results) {
			movies.push(...page.results);
		}
	});
	return movies;
}

export function getMovieYear(movie: IMovieThumbnail | ISingleMovie) {
	return movie.release_date ? new Date(movie.release_date).getFullYear() : null;
}

export function formatMovieRuntime(movie: ISingleMovie) {
	if (!movie) {
		return null;
	} else if (!movie.runtime) {
		return "N/A";
	}
	const hours = Math.floor(movie.runtime / 60);
	const minutes = movie.runtime % 60;
	const hoursString = hours > 0 ? `${hours}h` : "";
	const minutesString = minutes > 0 ? `${minutes}min` : "";
	return `${hoursString} ${minutesString}`;
}
