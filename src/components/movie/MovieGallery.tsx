import { Flex, FlexProps, Heading } from "@chakra-ui/react";
import { IMovieThumbnail, ISingleMovie } from "../../types";
import { MovieThumbnail } from "./";
import PostThumbnailSkeleton from "../skeleton/PostThumbnailSkeleton";
import { useSwipeScroll } from "../../hooks";
import { GridContainer } from "../styles";

interface Props extends FlexProps {
	movies: IMovieThumbnail[] | ISingleMovie[];
	header: string;
	loading?: boolean;
	isError?: boolean;
}

export function MovieGallery({ movies, header, loading, isError, ...props }: Props) {
	const ref = useSwipeScroll<HTMLDivElement>();

	function renderMovies() {
		return loading
			? Array(20)
					.fill(null)
					.map((_, i) => <PostThumbnailSkeleton key={i} />)
			: movies.map(movie => <MovieThumbnail key={movie.id} movie={movie} />);
	}

	if (isError) {
		return <Heading fontSize="md">Something went wrong!</Heading>;
	}

	if (!loading && movies.length === 0) {
		return <Heading fontSize="md">No movies for this category were found.</Heading>;
	}

	return (
		<GridContainer flexDirection="column" {...props}>
			<Heading fontSize={["2xl", "4xl"]}>{header}</Heading>
			<Flex ref={ref} overflowX="auto" gridGap="0.25rem" paddingY="0.75rem">
				{renderMovies()}
			</Flex>
		</GridContainer>
	);
}
