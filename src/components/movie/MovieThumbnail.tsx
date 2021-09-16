import {
	AbsoluteCenter,
	Box,
	Spinner,
	useImage,
	Link,
	Heading,
	Img,
	LinkProps,
} from "@chakra-ui/react";
import { MouseEvent } from "react";
import { usePosterViewerContext } from "../../contexts";
import { getImageUrl } from "../../services";
import { IMovieThumbnail, ISingleMovie } from "../../types";
import { FullscreenIcon } from "../icons";
import { Link as RouterLink } from "react-router-dom";
import placeholder from "../../assets/images/placeholder.png";

interface Props extends LinkProps {
	movie: IMovieThumbnail | ISingleMovie;
}

export function MovieThumbnail({ movie, ...props }: Props) {
	const poster_path = movie.poster_path ? getImageUrl(movie.poster_path) : undefined;
	const posterStatus = useImage({ src: poster_path });
	const { setActivePosterPath } = usePosterViewerContext();

	function fullscreenHandler(e: MouseEvent) {
		e.preventDefault();
		if (!movie.poster_path) {
			return;
		}
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
			title={movie.title}
			overflow="hidden"
			boxShadow="md"
			{...props}
		>
			<Box
				position="relative"
				backgroundColor="gray.700"
				height="100%"
				overflow="hidden"
				_after={
					!movie.poster_path
						? {
								content: `""`,
								position: "absolute",
								top: 0,
								left: 0,
								width: 200,
								height: 300,
								backgroundColor: "blackAlpha.400",
						  }
						: undefined
				}
			>
				{posterStatus !== "failed" && (
					<Img
						transitionDuration="0.15s"
						height="100%"
						src={poster_path ?? placeholder}
						objectFit="cover"
						_hover={{ transform: "scale(1.05)" }}
					/>
				)}
				{(!movie.poster_path || posterStatus === "failed") && (
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
							cursor="pointer"
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
