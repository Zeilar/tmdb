import { Box, Flex, Grid, Heading, Img, Text, useImage, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { useLastVisitedMovies } from "../../../hooks";
import { getImageUrl, getMovieById } from "../../../services";
import PostThumbnailSkeleton from "../../skeleton/PostThumbnailSkeleton";
import { abbreviateNumber } from "js-abbreviation-number";
import { MovieGallery } from "../../movie";
import placeholder from "../../../assets/images/placeholder.png";

interface IParams {
	id?: string | undefined;
}

export function SingleMovie() {
	const { id } = useParams<IParams>();
	const { data: lastVisitedMovies, addMovie } = useLastVisitedMovies();
	const { data, isError, isLoading } = useQuery(["movie", Number(id)], () =>
		getMovieById(Number(id))
	);
	const posterUrl = data?.movie.poster_path
		? getImageUrl(data?.movie.poster_path, "w300")
		: undefined;
	const posterStatus = useImage({ src: posterUrl });
	const backdropUrl = data?.movie.backdrop_path
		? getImageUrl(data?.movie.backdrop_path, "original")
		: undefined;

	console.log(data);

	useEffect(() => {
		if (data?.movie) {
			addMovie(data.movie);
		}
	}, [data?.movie, addMovie]);

	if (isError) {
		return <Heading>Something went wrong!</Heading>;
	}

	if (!isLoading && !data?.movie) {
		return <Heading>That movie could not be found.</Heading>;
	}

	if (isLoading || !data) {
		return <Spinner color="accent" margin="auto" size="xl" />;
	}

	function getMovieYear() {
		if (!data?.movie) {
			return null;
		}
		return new Date(data.movie.release_date).getFullYear();
	}

	function formatMovieRuntime() {
		if (!data?.movie || !data.movie.runtime) {
			return null;
		}
		const hours = Math.floor(data.movie.runtime / 60);
		const minutes = data.movie.runtime % 60;
		const hoursString = hours > 0 ? `${hours}h` : "";
		const minutesString = minutes > 0 ? `${minutes}min` : "";
		return `${hoursString} ${minutesString}`;
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
					{data.movie.status !== "Released" && (
						<Box
							top="0"
							left="0"
							position="absolute"
							width={115}
							height={115}
							overflow="hidden"
						>
							<Text
								paddingY="0.25rem"
								fontSize="sm"
								backgroundColor="gray.900"
								position="absolute"
								width={210}
								top="30px"
								right="-35px"
								textAlign="center"
								userSelect="none"
								transform="rotate(-45deg)"
							>
								Post Production
							</Text>
						</Box>
					)}
				</Box>
				<Flex flexDirection="column" paddingX="1rem">
					<Heading>
						{data.movie.title} ({getMovieYear()})
					</Heading>
					<Flex marginTop="1rem" textAlign="center" flexWrap="wrap" gridGap="2rem">
						<Flex flexDirection="column">
							<Heading size="md">Runtime</Heading>
							<Text>{formatMovieRuntime()}</Text>
						</Flex>
						<Flex flexDirection="column">
							<Heading size="md">Rating</Heading>
							<Text>{data.movie.vote_average} / 10</Text>
						</Flex>
						<Flex flexDirection="column">
							<Heading size="md">Revenue</Heading>
							<Text>
								{data.movie.revenue > 0
									? `$${abbreviateNumber(data.movie.revenue, 1, [
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
						{data.movie.overview}
					</Text>
				</Flex>
			</Grid>
			<Flex flexDirection="column" marginTop="5rem">
				<Heading marginBottom="0.5rem">Stars</Heading>
				<Grid gridTemplateColumns="repeat(4, 1fr)" gridGap="1rem">
					{data.credits.cast.slice(0, 16).map(person => (
						<Grid gridTemplateColumns="100px 1fr" backgroundColor="gray.900">
							<Flex>
								<Img
									width="100%"
									src={
										person.profile_path
											? getImageUrl(person.profile_path)
											: placeholder
									}
									objectFit="cover"
								/>
							</Flex>
							<Flex flexDirection="column" padding="1rem">
								<Heading
									as={Link}
									fontSize="md"
									to={`/person/${person.id}`}
									_hover={{ color: "accent" }}
								>
									{person.name}
								</Heading>
								<Text marginTop="0.5rem">{person.character}</Text>
							</Flex>
						</Grid>
					))}
				</Grid>
			</Flex>
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
