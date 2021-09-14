import { Flex, Heading } from "@chakra-ui/react";
import { useRef } from "react";
import { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { flattenMoviesQuery, getNextPage } from "../../../helpers";
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
		{
			getNextPageParam: query => getNextPage(query),
		}
	);

	function nextPage() {
		if (hasNextPage) {
			fetchNextPage();
		}
	}

	useScrollEvent(nextPage);

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
