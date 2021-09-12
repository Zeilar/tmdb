import { AbsoluteCenter, Box, Spinner, useImage, Link, Heading, Img } from "@chakra-ui/react";
import { MouseEvent, useMemo } from "react";
import { usePosterViewerContext } from "../../contexts";
import { getImageUrl } from "../../services";
import { IMovie } from "../../types/movie";
import { FullscreenIcon } from "../icons";
import { Link as RouterLink } from "react-router-dom";
import placeholder from "../../assets/images/placeholder.png";

interface Props {
	movie: IMovie;
}

export function MovieThumbnail({ movie }: Props) {
	const poster_path = useMemo(
		() => (movie.poster_path ? getImageUrl(movie.poster_path) : undefined),
		[movie.poster_path]
	);
	const posterStatus = useImage({ src: poster_path });
	const { setActivePosterPath } = usePosterViewerContext();

	function fullscreenHandler(e: MouseEvent) {
		e.preventDefault();
		if (!movie.poster_path) return;
		setActivePosterPath(getImageUrl(movie.poster_path, "original"));
	}

	return (
		<Link
			as={RouterLink}
			to={`/movie/${movie.id}`}
			width={200}
			height={300}
			transitionDuration="0.25s"
			flexShrink={0}
			_hover={{ transform: "scale(1.05)", zIndex: 20 }}
		>
			<Box
				boxShadow="md"
				position="relative"
				backgroundColor="gray.700"
				rounded="md"
				height="100%"
				overflow="hidden"
				title={movie.title}
				_after={{
					content: movie.poster_path ? undefined : `""`,
					position: "absolute",
					top: 0,
					left: 0,
					width: 200,
					height: 300,
					backgroundColor: "blackAlpha.400",
				}}
			>
				<Img height="100%" src={poster_path ?? placeholder} objectFit="cover" />
				{!movie.poster_path && (
					<AbsoluteCenter zIndex={10} padding="0.5rem" width="100%">
						<Heading size="md" textAlign="center" as="h2">
							{movie.title}
						</Heading>
					</AbsoluteCenter>
				)}
				{posterStatus === "loaded" && (
					<>
						<Box
							backgroundColor="blackAlpha.800"
							position="absolute"
							right="-3rem"
							top="-3rem"
							width="6rem"
							height="6rem"
							borderRadius="50%"
							onClick={fullscreenHandler}
						/>
						<FullscreenIcon pointerEvents="none" />
					</>
				)}
				{posterStatus === "loading" && (
					<AbsoluteCenter>
						<Spinner color="accent" />
					</AbsoluteCenter>
				)}
			</Box>
		</Link>
	);
}
