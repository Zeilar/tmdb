import { Box, Flex, Grid, Heading, Img, Text, useImage, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useLastVisitedMovies } from "../../../hooks";
import { getImageUrl, getMovieById, getRelatedMovies } from "../../../services";
import PostThumbnailSkeleton from "../../skeleton/PostThumbnailSkeleton";
import { abbreviateNumber } from "js-abbreviation-number";
import { MovieGallery } from "../../movie";
import { StarCard, SingleMoviePosterRibbon } from "../partials";
import { formatMovieRuntime, getMovieYear } from "../../../helpers";
import placeholder from "../../../assets/images/placeholder.png";
import { GridContainer } from "../../styles";

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
		: placeholder;
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

	const movie = singleMovieQuery.data.movie;

	return (
		<Flex flexDirection="column">
			<Grid gridTemplateColumns={["repeat(1, 1fr)", "300px 1fr"]}>
				<GridContainer alignSelf="start">
					<Box backgroundColor="gray.700" position="relative">
						{posterStatus === "loading" && (
							<PostThumbnailSkeleton minHeight={450} width="100%" height="100%" />
						)}
						{posterStatus === "loaded" && (
							<Img src={posterUrl} objectFit="cover" height="100%" width="100%" />
						)}
						{movie.status !== "Released" && (
							<SingleMoviePosterRibbon status={movie.status} />
						)}
					</Box>
				</GridContainer>
				<GridContainer marginLeft={["0", "0.5rem"]} marginTop={["0.5rem", "0"]}>
					<Flex
						height="100%"
						flexDirection="column"
						padding="1rem"
						zIndex={1}
						position="relative"
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
						<Heading fontSize={["2xl", "4xl"]} marginTop={["1rem", "0"]}>
							{movie.title}
							{movie.release_date && ` (${getMovieYear(movie)})`}
						</Heading>
						<Flex
							justifyContent={["space-between", "normal"]}
							fontSize="md"
							marginTop={["2rem", "1rem"]}
							marginBottom="2rem"
							flexWrap="wrap"
							gridGap="2rem"
						>
							<Flex flexDirection="column">
								<Heading marginBottom="0.25rem" size="md">
									Runtime
								</Heading>
								<Text>{formatMovieRuntime(movie)}</Text>
							</Flex>
							<Flex flexDirection="column">
								<Heading marginBottom="0.25rem" size="md">
									Rating
								</Heading>
								<Text>
									{movie.vote_count > 0 ? `${movie.vote_average} / 10` : "N/A"}
								</Text>
							</Flex>
							<Flex flexDirection="column">
								<Heading marginBottom="0.25rem" size="md">
									Revenue
								</Heading>
								<Text>
									{movie.revenue > 0
										? `$${abbreviateNumber(movie.revenue, 1, [
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
						<Text marginTop="0.5rem">{movie.overview}</Text>
					</Flex>
				</GridContainer>
			</Grid>
			<GridContainer flexDirection="column" marginTop="0.5rem">
				<Heading fontSize={["2xl", "4xl"]} marginBottom="0.5rem">
					Stars
				</Heading>
				<Grid
					gridTemplateColumns={[
						"repeat(1, 1fr)",
						"repeat(2, 1fr)",
						"repeat(2, 1fr)",
						"repeat(3, 1fr)",
					]}
					gridGap="0.5rem"
					overflowX="auto"
				>
					{singleMovieQuery.data.credits ? (
						singleMovieQuery.data.credits.cast
							.slice(0, 12)
							.map(person => <StarCard key={person.id} person={person} />)
					) : (
						<Heading size="md">No stars were found.</Heading>
					)}
				</Grid>
			</GridContainer>
			<MovieGallery
				loading={relatedMoviesQuery.isLoading}
				movies={relatedMoviesQuery.data ?? []}
				isError={relatedMoviesQuery.isError}
				marginTop="0.5rem"
				header="Related movies"
			/>
			{lastVisitedMovies && (
				<MovieGallery
					marginTop="0.5rem"
					movies={lastVisitedMovies}
					header="Recently viewed movies"
				/>
			)}
		</Flex>
	);
}
