import { Flex } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useLastVisitedMovies } from "../../hooks";
import { getLatestMovies, getPopularMovies, getTopMovies } from "../../services";
import { MovieGallery } from "../movie";

export function Home() {
	const latestMovieQuery = useQuery(["movies-latest", 1], () => getLatestMovies());
	const popularMoviesQuery = useQuery(["movies-popular", 1], () => getPopularMovies());
	const topRatedMoviesQuery = useQuery(["movies-top", 1], () => getTopMovies());
	const lastVisitedMovies = useLastVisitedMovies();

	return (
		<Flex flexDirection="column" gridGap="5rem">
			<MovieGallery
				header="Latest"
				isError={latestMovieQuery.isError}
				loading={latestMovieQuery.isLoading}
				movies={latestMovieQuery.data?.results ?? []}
			/>
			<MovieGallery
				header="Most popular"
				isError={popularMoviesQuery.isError}
				loading={popularMoviesQuery.isLoading}
				movies={popularMoviesQuery.data?.results ?? []}
			/>
			<MovieGallery
				header="Top rated"
				isError={topRatedMoviesQuery.isError}
				loading={topRatedMoviesQuery.isLoading}
				movies={topRatedMoviesQuery.data?.results ?? []}
			/>
			{lastVisitedMovies.data && (
				<MovieGallery header="Recently viewed movies" movies={lastVisitedMovies.data} />
			)}
		</Flex>
	);
}
