import { Flex } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getLatestMovies, getMostPopularMovies, getTopRatedMovies } from "../../services";
import { MovieGallery } from "../movie/MovieGallery";

export function Home() {
	const latestMovieQuery = useQuery(["movies-latest", 1], () => getLatestMovies());
	const popularMoviesQuery = useQuery(["movies-popular", 1], () => getMostPopularMovies());
	const topRatedMoviesQuery = useQuery(["movies-top", 1], () => getTopRatedMovies());

	return (
		<Flex flexDirection="column" gridGap="5rem">
			<MovieGallery
				viewMorePath="/latest"
				loading={latestMovieQuery.isLoading}
				header="Latest"
				movies={latestMovieQuery.data?.results ?? []}
			/>
			<MovieGallery
				viewMorePath="/popular"
				loading={popularMoviesQuery.isLoading}
				header="Most popular"
				movies={popularMoviesQuery.data?.results ?? []}
			/>
			<MovieGallery
				viewMorePath="/top"
				loading={topRatedMoviesQuery.isLoading}
				header="Top rated"
				movies={topRatedMoviesQuery.data?.results ?? []}
			/>
		</Flex>
	);
}
