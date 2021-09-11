import { Button, Flex, Grid, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useScrollEvent } from "../../hooks";
import { getLatestMovies } from "../../services";
import { MovieThumbnail } from "../movie";

export function LatestMovies() {
	const [page, setPage] = useState(1);
	const { data, isLoading, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery(
		"latest-movies",
		() => getLatestMovies(page),
		{ getNextPageParam: query => (query ? query.page + 1 : 1) }
	);

	function addPage() {
		setPage(page => page + 1);
	}

	function nextPage() {
		if (hasNextPage) {
			addPage();
		}
	}

	useScrollEvent(nextPage);

	useEffect(() => {
		fetchNextPage();
	}, [page]);

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
			{!isLoading && page === 1 && (
				<Button
					isLoading={isLoading}
					loadingText="Loading"
					variant="outline"
					spinnerPlacement="start"
					borderColor="accent"
					color="accent"
					marginY="5rem"
					marginX="auto"
					onClick={addPage}
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
