import { Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useScrollEvent } from "../../hooks";
import { getLatestMovies } from "../../services";
import { MovieThumbnail } from "../movie";

export function LatestMovies() {
	const [page, setPage] = useState(1);
	const { fetchNextPage, data } = useInfiniteQuery(
		["latest-movies"],
		() => getLatestMovies(page),
		{ getNextPageParam: query => (query ? query.page + 1 : 1) }
	);

	function nextPage() {
		setPage(page => page + 1);
	}

	useScrollEvent(nextPage);

	useEffect(() => {
		fetchNextPage();
	}, [page, fetchNextPage]);

	return (
		<Flex flexWrap="wrap">
			Latest movies
			<button onClick={nextPage}>Go next</button>
			{data?.pages.map(page =>
				page?.results.map(movie => <MovieThumbnail key={movie.id} movie={movie} />)
			)}
		</Flex>
	);
}
