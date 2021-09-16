import { StarIcon, TimeIcon } from "@chakra-ui/icons";
import {
	Box,
	Flex,
	Grid,
	Heading,
	Img,
	Text,
	useImage,
	List,
	ListItem,
	ListIcon,
	Spinner,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getImageUrl, getMovieById } from "../../../services";
import PostThumbnailSkeleton from "../../skeleton/PostThumbnailSkeleton";

interface IParams {
	id?: string | undefined;
}

export function SingleMovie() {
	const { id } = useParams<IParams>();
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

	if (isError) {
		return <Heading>Something went wrong!</Heading>;
	}

	if (!isLoading && !data?.movie) {
		return <Heading>That movie could not be found.</Heading>;
	}

	if (isLoading) {
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
				{data?.movie && data.movie.status !== "Released" && (
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
					{data?.movie.title} ({getMovieYear()})
				</Heading>
				<List marginTop="1rem" fontSize="xl">
					<ListItem display="flex" alignItems="center" height="2rem">
						<ListIcon as={TimeIcon} />
						{formatMovieRuntime()}
					</ListItem>
					<ListItem display="flex" alignItems="center" height="2rem">
						<ListIcon as={StarIcon} />
						{data?.movie.vote_average && <Text>{data.movie.vote_average} / 10</Text>}
					</ListItem>
				</List>
				<Text marginTop="auto" fontSize="xl">
					{data?.movie.overview}
				</Text>
			</Flex>
		</Grid>
	);
}
