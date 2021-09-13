import { Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { flattenMoviesQuery } from "../../helpers";
import { useScrollEvent } from "../../hooks";
import { getMoviesByGenres } from "../../services";
import { IGenre } from "../../types/genre";
import { MovieListLoadMoreButton, MovieListSpinner } from "../styles";
import { GenresList, MovieList } from "./partials";

export function Genres() {
	const [genres, setGenres] = useState<IGenre[]>([]);
	const { data, fetchNextPage, isError, refetch, isLoading, isFetching, hasNextPage } =
		useInfiniteQuery(
			["movies-genres", genres],
			queryParams =>
				getMoviesByGenres({ with_genres: genresToString(), page: queryParams.pageParam }),
			{ getNextPageParam: query => (query ? query.page + 1 : null) }
		);

	function genresToString() {
		if (genres.length === 0) {
			return null;
		}
		return genres.map(genre => String(genre.id)).join(",");
	}

	function nextPage() {
		fetchNextPage();
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
			<GenresList onChange={genres => setGenres(genres)} />
			<MovieList movies={flattenMoviesQuery(data)} />
			{!isLoading && !isFetching && hasNextPage && (
				<MovieListLoadMoreButton isLoading={isLoading} onClick={nextPage} />
			)}
			{(isLoading || isFetching) && <MovieListSpinner />}
		</Flex>
	);
}
