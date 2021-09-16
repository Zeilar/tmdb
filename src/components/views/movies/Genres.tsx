import { Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
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

	const fetchNextOnMount = useRef(true);

	useEffect(() => {
		// Get first 2 pages on mount to make the grid more full to start with
		if (!fetchNextOnMount.current || !data?.pages) {
			return;
		}
		const nextPage = getNextPage(data.pages[data.pages.length - 1]);
		if (nextPage) {
			fetchNextPage();
			fetchNextOnMount.current = false;
		}
	}, [fetchNextPage, data]);

	if (isError) {
		return <Heading>Something went wrong!</Heading>;
	}

	return (
		<Flex flexDirection="column">
			<GenreList onChange={genres => setGenres(genres)} />
			<Heading marginBottom="1rem">
				{genres.length > 0 ? "Showing movies with genres" : "Showing all movies"}
			</Heading>
			<Heading marginBottom="1.5rem" fontSize="md">
				{genres.map(genre => genre.name).join(", ")}
			</Heading>
			<MovieList movies={flattenMoviesQuery(data)} />
			{!isLoading && !isFetching && hasNextPage && (
				<MovieListLoadMoreButton isLoading={isLoading} onClick={nextPage} />
			)}
			{(isLoading || isFetching) && <MovieListSpinner />}
		</Flex>
	);
}
