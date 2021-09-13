import { IManyMoviesQuery, IMovieThumbnail } from "../types/movie";
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
