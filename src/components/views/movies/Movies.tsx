import { Button, Flex, Heading, Spinner } from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";
import { flattenMoviesQuery } from "../../../helpers";
import { useScrollEvent } from "../../../hooks";
import { IManyMoviesQuery, IParams } from "../../../types/movie";
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
				<Button
					isLoading={isLoading}
					loadingText="Loading"
					variant="outline"
					spinnerPlacement="start"
					borderColor="accent"
					color="accent"
					marginY="5rem"
					marginX="auto"
					onClick={nextPage}
				>
					Load More
				</Button>
			)}
			{(isLoading || isFetching) && (
				<Spinner color="accent" size="xl" marginX="auto" marginY="5rem" />
			)}
		</Flex>
	);
}
