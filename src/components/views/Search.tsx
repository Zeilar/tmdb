import { Flex, Heading } from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";
import { RouteComponentProps } from "../../types/props";
import { getMoviesBySearch } from "../../services";
import { MovieList } from "./partials";
import { flattenMoviesQuery, getNextPage } from "../../helpers";
import { useScrollEvent } from "../../hooks";
import { MovieListLoadMoreButton, MovieListSpinner } from "../styles";
import { useEffect, useRef } from "react";

interface IParams {
	query?: string;
}

export function Search({ location }: RouteComponentProps<IParams>) {
	const query = new URLSearchParams(location.search).get("query");
	const { data, isError, fetchNextPage, isLoading, isFetching, hasNextPage } = useInfiniteQuery(
		["movies-search", query],
		queryParams => getMoviesBySearch({ query, page: queryParams.pageParam ?? 1 }),
		{
			getNextPageParam: query => getNextPage(query),
			enabled: query != null,
		}
	);

	const fetchNextOnMount = useRef(true);

	useEffect(() => {
		// Get first 2 pages on mount to make the grid more full to start with
		if (!fetchNextOnMount.current || !data?.pages) {
			return;
		}
		const nextPage = getNextPage(data.pages[data.pages.length - 1]);
		if (nextPage) {
			fetchNextPage();
			fetchNextOnMount.current = false;
		}
	}, [fetchNextPage, data]);

	function nextPage() {
		if (hasNextPage) {
			fetchNextPage();
		}
	}

	useScrollEvent(nextPage);

	if (isError) {
		return <Heading>Something went wrong!</Heading>;
	}

	return (
		<Flex flexDirection="column">
			{query && <Heading marginBottom="1rem">Search results for "{query}"</Heading>}
			<MovieList movies={flattenMoviesQuery(data)} />
			{!isLoading && !isFetching && hasNextPage && (
				<MovieListLoadMoreButton isLoading={isLoading} onClick={nextPage} />
			)}
			{(isLoading || isFetching) && <MovieListSpinner />}
		</Flex>
	);
}
