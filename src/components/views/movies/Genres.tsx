import { Box, Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { flattenMoviesQuery, getNextPage } from "../../../helpers";
import { useScrollEvent } from "../../../hooks";
import { getMoviesByGenres } from "../../../services";
import { IGenre } from "../../../types";
import { MovieListLoadMoreButton, MovieListSpinner } from "../../styles";
import { GenreList, MovieList } from "../partials";

export function Genres() {
	const [genres, setGenres] = useState<IGenre[]>([]);
	const { data, fetchNextPage, isError, refetch, isLoading, isFetching, hasNextPage } =
		useInfiniteQuery(
			["movies-genres", genres],
			queryParams =>
				getMoviesByGenres({ with_genres: genresToString(), page: queryParams.pageParam }),
			{ getNextPageParam: query => getNextPage(query) }
		);

	function genresToString() {
		if (genres.length === 0) {
			return null;
		}
		return genres.map(genre => String(genre.id)).join(",");
	}

	function nextPage() {
		if (hasNextPage) {
			fetchNextPage();
		}
	}

	useEffect(() => {
		refetch();
	}, [genres, refetch]);

	useScrollEvent(nextPage);

	if (isError) {
		return <Heading>Something went wrong!</Heading>;
	}

	return (
		<Flex flexDirection="column">
			<GenreList onChange={genres => setGenres(genres)} />
			<Heading marginBottom="1rem">
				{genres.length > 0 ? "Showing movies for" : "Showing all movies"}
			</Heading>
			<Flex marginBottom="1.5rem" gridGap="0.5rem">
				{genres.map(genre => (
					<Box
						key={genre.id}
						backgroundColor="gray.700"
						paddingX="1rem"
						paddingY="0.5rem"
						rounded="3xl"
						boxShadow="md"
					>
						{genre.name}
					</Box>
				))}
			</Flex>
			<MovieList movies={flattenMoviesQuery(data)} />
			{!isLoading && !isFetching && hasNextPage && (
				<MovieListLoadMoreButton isLoading={isLoading} onClick={nextPage} />
			)}
			{(isLoading || isFetching) && <MovieListSpinner />}
		</Flex>
	);
}
