import { Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { flattenMoviesQuery } from "../../helpers";
import { useScrollEvent } from "../../hooks";
import { getMoviesByDiscover } from "../../services";
import { IGenre } from "../../types/genre";
import { GenresList, MovieList } from "./partials";

export function Genres() {
	const [genres, setGenres] = useState<IGenre[]>([]);
	const { data, fetchNextPage, isError, refetch } = useInfiniteQuery(
		"genres-movies",
		page => getMoviesByDiscover({ with_genres: genresToString(), page: page.pageParam }),
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
		</Flex>
	);
}
