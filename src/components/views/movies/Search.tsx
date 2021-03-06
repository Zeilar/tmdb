import { Flex, Heading } from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";
import { RouteComponentProps } from "../../../types";
import { getMoviesBySearch } from "../../../services";
import { MovieList } from "../partials";
import { flattenMoviesQuery, getNextPage } from "../../../helpers";
import { useScrollEvent } from "../../../hooks";
import { MovieListLoadMoreButton, MovieListSpinner } from "../../styles";

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
			enabled: query !== null,
		}
	);

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
			{query && (
				<Heading fontSize={["xl", "4xl"]} marginBottom="1rem">
					Search results for "{query}"
				</Heading>
			)}
			<MovieList movies={flattenMoviesQuery(data)} />
			{!isLoading && !isFetching && hasNextPage && (
				<MovieListLoadMoreButton isLoading={isLoading} onClick={nextPage} />
			)}
			{(isLoading || isFetching) && <MovieListSpinner />}
		</Flex>
	);
}
