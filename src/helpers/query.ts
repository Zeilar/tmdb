import { IManyMoviesQuery } from "../types/movie";

export function getNextPage(query: IManyMoviesQuery | null | undefined) {
	if (!query) return null;
	const isLastPage = query.page >= query.total_pages;
	return isLastPage ? null : query.page + 1;
}
