import { Box, Flex, Grid, Heading, Img, Text, useImage, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useLastVisitedMovies } from "../../../hooks";
import { getImageUrl, getMovieById, getRelatedMovies } from "../../../services";
import PostThumbnailSkeleton from "../../skeleton/PostThumbnailSkeleton";
import { abbreviateNumber } from "js-abbreviation-number";
import { MovieGallery } from "../../movie";
import { StarCard } from "../partials";
import SingleMoviePosterRibbon from "../partials/SingleMoviePosterRibbon";
import { formatMovieRuntime, getMovieYear } from "../../../helpers";

interface IParams {
	id?: string | undefined;
}

export function SingleMovie() {
	const { id } = useParams<IParams>();
	const { data: lastVisitedMovies, addMovie } = useLastVisitedMovies();
	const singleMovieQuery = useQuery(["movie", Number(id)], () => getMovieById(Number(id)), {
		enabled: id !== undefined,
	});
	const relatedMoviesQuery = useQuery(
		["related-movies", Number(id)],
		() => getRelatedMovies(Number(id)),
		{ enabled: id !== undefined }
	);
	const posterUrl = singleMovieQuery.data?.movie.poster_path
		? getImageUrl(singleMovieQuery.data?.movie.poster_path, "w300")
		: undefined;
	const posterStatus = useImage({ src: posterUrl });
	const backdropUrl = singleMovieQuery.data?.movie.backdrop_path
		? getImageUrl(singleMovieQuery.data?.movie.backdrop_path, "original")
		: undefined;

	useEffect(() => {
		if (singleMovieQuery.data?.movie) {
			addMovie(singleMovieQuery.data.movie);
		}
	}, [singleMovieQuery.data?.movie, addMovie]);

	if (singleMovieQuery.isError) {
		return <Heading>Something went wrong!</Heading>;
	}

	if (!singleMovieQuery.isLoading && !singleMovieQuery.data?.movie) {
		return <Heading>That movie could not be found.</Heading>;
	}

	if (singleMovieQuery.isLoading || !singleMovieQuery.data) {
		return <Spinner color="accent" margin="auto" size="xl" />;
	}

	return (
		<Flex flexDirection="column">
			<Grid
				gridTemplateColumns="300px 1fr"
				zIndex={1}
				position="relative"
				padding="2rem"
				backgroundColor="gray.900"
				backgroundImage={backdropUrl}
				backgroundSize="cover"
				backgroundPosition="center"
				_after={
					backdropUrl
						? {
								content: `""`,
								position: "absolute",
								top: 0,
								left: 0,
								width: "100%",
								height: "100%",
								backgroundColor: "blackAlpha.900",
								zIndex: -1,
						  }
						: undefined
				}
			>
				<Box height={450} backgroundColor="gray.700" position="relative">
					{(posterStatus === "loading" || posterStatus === "pending") && (
						<PostThumbnailSkeleton width="100%" height="100%" />
					)}
					{posterStatus === "loaded" && (
						<Img src={posterUrl} objectFit="cover" height="100%" />
					)}
					{singleMovieQuery.data.movie.status !== "Released" && (
						<SingleMoviePosterRibbon status={singleMovieQuery.data.movie.status} />
					)}
				</Box>
				<Flex flexDirection="column" paddingX="1rem">
					<Heading>
						{singleMovieQuery.data.movie.title} (
						{getMovieYear(singleMovieQuery.data.movie)})
					</Heading>
					<Flex marginTop="1rem" textAlign="center" flexWrap="wrap" gridGap="2rem">
						<Flex flexDirection="column">
							<Heading marginBottom="0.25rem" size="md">
								Runtime
							</Heading>
							<Text>{formatMovieRuntime(singleMovieQuery.data.movie)}</Text>
						</Flex>
						<Flex flexDirection="column">
							<Heading marginBottom="0.25rem" size="md">
								Rating
							</Heading>
							<Text>{singleMovieQuery.data.movie.vote_average} / 10</Text>
						</Flex>
						<Flex flexDirection="column">
							<Heading marginBottom="0.25rem" size="md">
								Revenue
							</Heading>
							<Text>
								{singleMovieQuery.data.movie.revenue > 0
									? `$${abbreviateNumber(singleMovieQuery.data.movie.revenue, 1, [
											"",
											"K",
											"M",
											"B",
									  ])}`
									: "N/A"}
							</Text>
						</Flex>
					</Flex>
					<Heading size="md" marginTop="auto">
						Overview
					</Heading>
					<Text marginTop="0.5rem" fontSize="xl">
						{singleMovieQuery.data.movie.overview}
					</Text>
				</Flex>
			</Grid>
			<Flex flexDirection="column" marginTop="5rem">
				<Heading marginBottom="0.5rem">Stars</Heading>
				<Grid gridTemplateColumns="repeat(4, 1fr)" gridGap="1rem">
					{singleMovieQuery.data.credits.cast.slice(0, 16).map(person => (
						<StarCard key={person.id} person={person} />
					))}
				</Grid>
			</Flex>

			<MovieGallery
				loading={relatedMoviesQuery.isLoading}
				movies={relatedMoviesQuery.data ?? []}
				isError={relatedMoviesQuery.isError}
				marginTop="5rem"
				header="Related movies"
			/>

			{lastVisitedMovies && (
				<MovieGallery
					marginTop="5rem"
					movies={lastVisitedMovies}
					header="Last visited movies"
				/>
			)}
		</Flex>
	);
}
