import { AbsoluteCenter, Box, Spinner, useImage } from "@chakra-ui/react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../services";
import { IMovieThumbnail } from "../types/movie";

interface Props {
	movie: IMovieThumbnail;
}

export default function MovieThumbnail({ movie }: Props) {
	const poster_path = useMemo(
		() => (movie.poster_path ? getImageUrl(movie.poster_path) : undefined),
		[movie.poster_path]
	);
	const posterStatus = useImage({ src: poster_path });

	return (
		<Link to={`/movie/${movie.id}/${movie.title}`}>
			<Box
				position="relative"
				backgroundColor="gray.700"
				backgroundImage={poster_path}
				backgroundSize="cover"
				backgroundPosition="center"
				backgroundRepeat="no-repeat"
				height="100%"
			>
				{posterStatus === "loading" && (
					<AbsoluteCenter>
						<Spinner color="accent" />
					</AbsoluteCenter>
				)}
				<AbsoluteCenter
					whiteSpace="nowrap"
					textOverflow="ellipsis"
					overflowX="hidden"
					fontWeight="700"
					position="relative"
					zIndex={1}
					width="100%"
					transform="none"
					top="unset"
					left="0"
					bottom="0"
					padding="0.5rem"
					_after={{
						zIndex: -1,
						left: 0,
						bottom: 0,
						content: `""`,
						position: "absolute",
						width: "100%",
						height: "100%",
						backgroundColor: "rgba(0, 0, 0, 0.65)",
					}}
				>
					{movie.title}
				</AbsoluteCenter>
			</Box>
		</Link>
	);
}
