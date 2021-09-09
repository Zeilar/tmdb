import { AbsoluteCenter, Box, Spinner, useImage, Link } from "@chakra-ui/react";
import { useMemo } from "react";
import { usePosterViewerContext } from "../../contexts";
import { getImageUrl } from "../../services";
import { IMovieThumbnail } from "../../types/movie";
import { FullscreenIcon } from "../icons";
import { Link as RouterLink } from "react-router-dom";

interface Props {
	movie: IMovieThumbnail;
}

function prettifyURL(url: string) {
	return url.replaceAll(" ", "-");
}

export function MovieThumbnail({ movie }: Props) {
	const poster_path = useMemo(
		() => (movie.poster_path ? getImageUrl(movie.poster_path) : undefined),
		[movie.poster_path]
	);
	const posterStatus = useImage({ src: poster_path });
	const { setActivePosterPath } = usePosterViewerContext();

	function fullscreenHandler() {
		if (!movie.poster_path) return;
		setActivePosterPath(getImageUrl(movie.poster_path, "original"));
	}

	return (
		<Link
			as={RouterLink}
			to={`/movie/${movie.id}/${prettifyURL(movie.title)}`}
			transitionDuration="0.25s"
			_hover={{ transform: "scale(1.05)" }}
		>
			<Box
				boxShadow="md"
				position="relative"
				backgroundColor="gray.700"
				backgroundImage={poster_path}
				backgroundSize="cover"
				backgroundPosition="center"
				backgroundRepeat="no-repeat"
				height="100%"
				title={movie.title}
			>
				{posterStatus === "loaded" && <FullscreenIcon onClick={fullscreenHandler} />}
				{posterStatus === "loading" && (
					<AbsoluteCenter>
						<Spinner color="accent" />
					</AbsoluteCenter>
				)}
			</Box>
		</Link>
	);
}
