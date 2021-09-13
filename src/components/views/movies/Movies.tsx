import { Button, Flex, Heading, Spinner } from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";
import { flattenMoviesQuery } from "../../../helpers";
import { useScrollEvent } from "../../../hooks";
import { IManyMoviesQuery, IParams } from "../../../types/movie";
import { MovieListLoadMoreButton, MovieListSpinner } from "../../styles";
import { MovieList } from "../partials";

interface Props {
	queryID: any;
	callback: (params: IParams) => Promise<IManyMoviesQuery | null>;
	params?: IParams;
}

export function Movies({ queryID, callback, params }: Props) {
	const { data, isLoading, isFetching, hasNextPage, fetchNextPage, isError } = useInfiniteQuery(
		queryID,
		args => callback({ page: args.pageParam ?? 1, ...params }),
		{ getNextPageParam: query => (query ? query.page + 1 : null) }
	);

	function nextPage() {
		fetchNextPage();
	}

	useScrollEvent(nextPage);

	if (isError) {
		return <Heading>Something went wrong!</Heading>;
	}

	return (
		<Flex flexDirection="column">
			<MovieList movies={flattenMoviesQuery(data)} />
			{!isLoading && !isFetching && hasNextPage && (
				<MovieListLoadMoreButton isLoading={isLoading} onClick={nextPage} />
			)}
			{(isLoading || isFetching) && <MovieListSpinner />}
		</Flex>
	);
}
