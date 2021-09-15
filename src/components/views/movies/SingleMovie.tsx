import { Box, Flex, Img, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getImageUrl, getMovieById } from "../../../services";
import { MovieThumbnail } from "../../movie";

interface IParams {
	id: string | undefined;
}

export function SingleMovie() {
	const { id } = useParams<IParams>();
	const { data } = useQuery(["movie", Number(id)], () => getMovieById(Number(id)));
	const posterUrl = data?.movie.poster_path
		? getImageUrl(data?.movie.poster_path, "w500")
		: undefined;
	const backdropUrl = data?.movie.backdrop_path
		? getImageUrl(data?.movie.backdrop_path, "original")
		: undefined;

	console.log(data);

	return (
		<Flex
			flexDirection="column"
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
							backgroundColor: "blackAlpha.800",
							zIndex: -1,
					  }
					: undefined
			}
		>
			<Flex padding="2rem" flexDirection="column">
				<Flex>
					{data?.movie && (
						<MovieThumbnail
							movie={data.movie}
							_hover={{}}
							as="div"
							cursor="default"
							title={undefined}
						/>
					)}
					{/* <Box width={300}>
						<Img src={posterUrl} />
					</Box> */}
					<Text marginX="1rem" marginTop="auto" fontSize="xl">
						{data?.movie.overview}
					</Text>
				</Flex>
			</Flex>
		</Flex>
	);
}
