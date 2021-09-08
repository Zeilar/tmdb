import { Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "react-query";
import { getLatestMovies } from "../../services";
import { IMovieThumbnail } from "../../types/movie";
import MovieGallery from "../MovieGallery";
import MovieThumbnail from "../MovieThumbnail";

export function Home() {
	const [page, setPage] = useState(1);
	const latestMovieQuery = useQuery(["movies-latest", page], getLatestMovies);

	console.log(latestMovieQuery.data, latestMovieQuery.isError);

	return (
		<Flex direction="column">
			<Heading>TMDB</Heading>
			<MovieGallery
				loading={latestMovieQuery.isLoading}
				header="Latest movies"
				movies={latestMovieQuery.data?.results ?? []}
			/>
		</Flex>
	);
}
