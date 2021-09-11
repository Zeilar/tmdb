import { Button, Flex, Grid, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useScrollEvent } from "../../hooks";
import { getAllGenres, getLatestMovies, getMoviesByGenres } from "../../services";
import { MovieThumbnail } from "../movie";

export function LatestMovies() {
	const [page, setPage] = useState(1);
	const [genre, setGenre] = useState();
	const latestMoviesQuery = useInfiniteQuery("latest-movies", () => getLatestMovies(page), {
		getNextPageParam: query => (query ? query.page + 1 : 1),
	});
	const genresQuery = useQuery("genres", getAllGenres);

	async function s() {
		const genres = await getAllGenres();
		if (!genres) return;
		const movies = await getMoviesByGenres([genres[0]]);
		// console.log(movies);
	}
	s();

	function addPage() {
		setPage(page => page + 1);
	}

	function nextPage() {
		if (latestMoviesQuery.hasNextPage) {
			addPage();
		}
	}

	useScrollEvent(nextPage);

	useEffect(() => {
		latestMoviesQuery.fetchNextPage();
	}, [page]);

	console.log("render");

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
				{latestMoviesQuery.data?.pages.map(page =>
					page?.results.map(movie => <MovieThumbnail key={movie.id} movie={movie} />)
				)}
			</Grid>
			{page === 1 && (
				<Button
					isLoading={latestMoviesQuery.isLoading}
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
			{latestMoviesQuery.isFetching && (
				<Spinner color="accent" size="xl" marginX="auto" marginY="5rem" />
			)}
		</Flex>
	);
}
