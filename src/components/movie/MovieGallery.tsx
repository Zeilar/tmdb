import { Flex, Grid, Heading, Link } from "@chakra-ui/react";
import { IMovieThumbnail } from "../../types/movie";
import { MovieThumbnail } from "./";
import PostThumbnailSkeleton from "../skeleton/PostThumbnailSkeleton";
import { Link as RouterLink } from "react-router-dom";

interface Props {
	movies: IMovieThumbnail[];
	header: string;
	loading: boolean;
	viewMorePath: string;
}

export function MovieGallery({ movies, header, loading, viewMorePath }: Props) {
	function renderMovies() {
		if (loading)
			return Array(20)
				.fill(null)
				.map((_, i) => <PostThumbnailSkeleton key={i} />);
		return movies.map(movie => <MovieThumbnail key={movie.id} movie={movie} />);
	}

	return (
		<Flex flexDirection="column">
			<Heading marginBottom="0.5rem" color="accent">
				{header}
			</Heading>
			<Grid
				overflowX="auto"
				height="20rem"
				gridGap="0.5rem"
				templateColumns="repeat(20, 12rem)"
				paddingY="0.5rem"
			>
				{renderMovies()}
			</Grid>
			<Link
				as={RouterLink}
				to={viewMorePath}
				marginTop="0.5rem"
				_hover={{ textDecoration: "none", color: "accent" }}
			>
				View more
			</Link>
		</Flex>
	);
}
