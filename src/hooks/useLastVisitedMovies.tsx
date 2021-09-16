import { useCallback } from "react";
import { ISingleMovie } from "../types";
import { useLocalStorage } from "./";

export function useLastVisitedMovies() {
	const { data, setData } = useLocalStorage<ISingleMovie[]>("lastVisitedMovies");

	const addMovie = useCallback(
		(movie: ISingleMovie) => {
			setData(movies => {
				if (!movies) return [movie];

				if (movies.some(element => element.id === movie.id)) {
					return [movie, ...movies.filter(element => element.id !== movie.id)];
				}

				if (movies.length >= 9) {
					const firstNine = movies.slice(0, 9);
					return [movie, ...firstNine];
				}

				return [movie, ...movies];
			});
		},
		[setData]
	);

	const removeMovie = useCallback(
		(movie: ISingleMovie) => {
			setData(movies => {
				if (!movies || !movies.some(element => element.id === movie.id)) {
					return movies;
				}
				return movies.filter(element => element.id !== movie.id);
			});
		},
		[setData]
	);

	return { data, addMovie, removeMovie };
}
