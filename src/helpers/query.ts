import { IManyMoviesQuery } from "../types/movie";

export function isLastPage(query: IManyMoviesQuery | null) {
	return query ? query.page >= query.total_pages : false;
}
