import { Flex, Grid, Heading } from "@chakra-ui/react";
import { useState, useEffect, ReactNode } from "react";
import { IMovieThumbnail } from "../types/movie";
import MovieThumbnail from "./MovieThumbnail";
import PostThumbnailSkeleton from "./skeleton/PostThumbnailSkeleton";

interface Props {
	movies: IMovieThumbnail[];
	header: string;
	loading: boolean;
}

export default function MovieGallery({ movies, header, loading }: Props) {
	function renderMovies() {
		if (loading)
			return Array(20)
				.fill(null)
				.map((_, i) => <PostThumbnailSkeleton key={i} />);
		return movies.map(movie => <MovieThumbnail key={movie.id} movie={movie} />);
	}

	return (
		<Flex flexDirection="column">
			<Heading color="accent">{header}</Heading>
			<Grid
				overflowX="auto"
				height="10rem"
				gridGap="0.5rem"
				templateColumns="repeat(20, 17rem)"
				paddingY="0.5rem"
			>
				{renderMovies()}
			</Grid>
		</Flex>
	);
}
