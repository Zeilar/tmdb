import { Flex, Grid, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useScrollEvent } from "../../hooks";
import { getLatestMovies } from "../../services";
import { MovieThumbnail } from "../movie";

export function LatestMovies() {
	const [page, setPage] = useState(1);
	const { fetchNextPage, data, hasNextPage, isFetching } = useInfiniteQuery(
		"latest-movies",
		() => getLatestMovies(page),
		{ getNextPageParam: query => (query ? query.page + 1 : 1) }
	);

	function addPage() {
		setPage(page => page + 1);
	}

	function nextPage() {
		if (hasNextPage) addPage();
	}

	useScrollEvent(nextPage);

	/**
	 * Since the load-more-scroll depends on being able to scroll,
	 * load 2 pages at first render to make sure the user can scroll to start the process
	 */
	useEffect(() => {
		addPage();
	}, []);

	useEffect(() => {
		// Without the timeout, React Query won't refetch on that first render to get 2 pages *shrug*
		const timeout = setTimeout(() => {
			fetchNextPage();
		}, 1);

		return () => {
			clearTimeout(timeout);
		};
	}, [page, fetchNextPage]);

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
			{isFetching && <Spinner color="accent" size="xl" marginX="auto" marginY="5rem" />}
		</Flex>
	);
}
