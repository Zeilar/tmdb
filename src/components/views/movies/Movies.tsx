import { Button, Flex, Grid, Heading, Spinner } from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";
import { useScrollEvent } from "../../../hooks";
import { MovieThumbnail } from "../../movie";
import { IManyMoviesQuery } from "../../../types/movie";

interface Props {
	queryID: string;
	callback: (page?: number | undefined) => Promise<IManyMoviesQuery | null>;
}

export function Movies({ queryID, callback }: Props) {
	const { data, isLoading, isFetching, hasNextPage, fetchNextPage, isError } = useInfiniteQuery(
		queryID,
		args => callback(args.pageParam ?? 1),
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
			<Grid
				gridTemplateColumns={[
					"repeat(3, 1fr)",
					"repeat(4, 1fr)",
					"repeat(5, 1fr)",
					"repeat(6, 1fr)",
				]}
				gridGap="0.5rem"
			>
				{data?.pages.map(page =>
					page?.results.map(movie => <MovieThumbnail key={movie.id} movie={movie} />)
				)}
			</Grid>
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
