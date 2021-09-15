import { Box, Flex, Grid, Heading, Img, Text, useImage } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getImageUrl, getMovieById } from "../../../services";
import PostThumbnailSkeleton from "../../skeleton/PostThumbnailSkeleton";

interface IParams {
	id: string | undefined;
}

export function SingleMovie() {
	const { id } = useParams<IParams>();
	const { data } = useQuery(["movie", Number(id)], () => getMovieById(Number(id)));
	const posterUrl = data?.movie.poster_path
		? getImageUrl(data?.movie.poster_path, "w300")
		: undefined;
	const posterStatus = useImage({ src: posterUrl });
	const backdropUrl = data?.movie.backdrop_path
		? getImageUrl(data?.movie.backdrop_path, "original")
		: undefined;

	console.log(data);

	return (
		<Grid
			gridTemplateColumns="300px 1fr"
			zIndex={1}
			position="relative"
			padding="2rem"
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
			<Box height={450} backgroundColor="gray.700">
				{(posterStatus === "loading" || posterStatus === "pending") && (
					<PostThumbnailSkeleton width="100%" />
				)}
				{posterStatus === "loaded" && <Img src={posterUrl} objectFit="cover" />}
			</Box>

			<Flex flexDirection="column" paddingX="1rem">
				<Heading>{data?.movie.title}</Heading>
				<Text marginTop="auto" fontSize="xl">
					{data?.movie.overview}
				</Text>
			</Flex>
		</Grid>
	);
}
