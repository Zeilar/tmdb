import { Button, Flex, Grid } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useScrollEvent } from "../../hooks";
import { getLatestMovies } from "../../services";
import { MovieThumbnail } from "../movie";

export function LatestMovies() {
	const [page, setPage] = useState(1);
	const { fetchNextPage, data, hasNextPage } = useInfiniteQuery(
		["latest-movies"],
		() => getLatestMovies(page),
		{ getNextPageParam: query => (query ? query.page + 1 : 1) }
	);

	function nextPage() {
		if (hasNextPage) {
			setPage(page => page + 1);
		}
	}

	// useScrollEvent(nextPage);

	useEffect(() => {
		fetchNextPage();
	}, [page, fetchNextPage]);

	return (
		<Flex>
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
			<Button colorScheme="cyan" variant="ghost" onClick={nextPage}>
				Go next
			</Button>
		</Flex>
	);
}
