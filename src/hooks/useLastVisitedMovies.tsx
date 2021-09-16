import { useCallback } from "react";
import { ISingleMovie } from "../types/movie";
import { useLocalStorage } from "./useLocalStorage";

export function useLastVisitedMovies() {
	const { data, setData } = useLocalStorage<ISingleMovie[]>("lastVisitedMovies");

	const addMovie = useCallback(
		(movie: ISingleMovie) => {
			if (data?.some(element => element.id === movie.id)) {
				return;
			}
			setData(movies => (movies ? [...movies, movie] : [movie]));
		},
		[data, setData]
	);

	const removeMovie = useCallback(
		(movie: ISingleMovie) => {
			if (!data || !data.some(element => element.id === movie.id)) {
				return;
			}
			setData(movies => movies!.filter(element => element.id !== movie.id));
		},
		[data, setData]
	);

	return { addMovie, removeMovie };
}
