import { Flex, Heading } from "@chakra-ui/react";
import { IMovieThumbnail } from "../../types/movie";
import { MovieThumbnail } from "./";
import PostThumbnailSkeleton from "../skeleton/PostThumbnailSkeleton";
import { useSwipeScroll } from "../../hooks";

interface Props {
	movies: IMovieThumbnail[];
	header: string;
	loading: boolean;
	isError: boolean;
}

export function MovieGallery({ movies, header, loading, isError }: Props) {
	const ref = useSwipeScroll<HTMLDivElement>();

	function renderMovies() {
		return loading
			? Array(20)
					.fill(null)
					.map((_, i) => <PostThumbnailSkeleton key={i} />)
			: movies.map(movie => <MovieThumbnail key={movie.id} movie={movie} />);
	}

	if (isError) {
		return <Heading>Something went wrong!</Heading>;
	}

	if (!loading && movies.length === 0) {
		return <Heading>No movies for this category were found.</Heading>;
	}

	return (
		<Flex flexDirection="column">
			<Heading color="accent">{header}</Heading>
			<Flex ref={ref} overflowX="auto" gridGap="0.25rem" paddingY="0.75rem">
				{renderMovies()}
			</Flex>
		</Flex>
	);
}
