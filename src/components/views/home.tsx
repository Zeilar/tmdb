import { Flex } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getLatestMovies, getPopularMovies, getTopMovies } from "../../services";
import { MovieGallery } from "../movie";

export function Home() {
	const latestMovieQuery = useQuery(["movies-latest", 1], () => getLatestMovies());
	const popularMoviesQuery = useQuery(["movies-popular", 1], () => getPopularMovies());
	const topRatedMoviesQuery = useQuery(["movies-top", 1], () => getTopMovies());

	return (
		<Flex flexDirection="column" gridGap="5rem">
			<MovieGallery
				loading={latestMovieQuery.isLoading}
				header="Latest"
				movies={latestMovieQuery.data?.results ?? []}
			/>
			<MovieGallery
				loading={popularMoviesQuery.isLoading}
				header="Most popular"
				movies={popularMoviesQuery.data?.results ?? []}
			/>
			<MovieGallery
				loading={topRatedMoviesQuery.isLoading}
				header="Top rated"
				movies={topRatedMoviesQuery.data?.results ?? []}
			/>
		</Flex>
	);
}
