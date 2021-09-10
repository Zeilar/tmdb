import { Flex, Heading, Link, Text } from "@chakra-ui/react";
import { IMovieThumbnail } from "../../types/movie";
import { MovieThumbnail } from "./";
import PostThumbnailSkeleton from "../skeleton/PostThumbnailSkeleton";
import { Link as RouterLink } from "react-router-dom";
import { useSwipeScroll } from "../../hooks";

interface Props {
	movies: IMovieThumbnail[];
	header: string;
	loading: boolean;
	viewMorePath: string;
}

export function MovieGallery({ movies, header, loading, viewMorePath }: Props) {
	const ref = useSwipeScroll<HTMLDivElement>();

	function renderMovies() {
		if (loading)
			return Array(20)
				.fill(null)
				.map((_, i) => <PostThumbnailSkeleton key={i} />);
		return movies.map(movie => <MovieThumbnail key={movie.id} movie={movie} />);
	}

	if (!loading && movies.length === 0) {
		return <Text>No movies for this category were found.</Text>;
	}

	return (
		<Flex flexDirection="column">
			<Heading color="accent">{header}</Heading>
			<Link
				as={RouterLink}
				to={viewMorePath}
				marginTop="0.5rem"
				_hover={{ textDecoration: "none", color: "accent" }}
			>
				View more
			</Link>
			<Flex ref={ref} overflowX="auto" gridGap="0.25rem" paddingY="0.75rem">
				{renderMovies()}
			</Flex>
		</Flex>
	);
}
