import { Grid } from "@chakra-ui/react";
import { IMovieThumbnail } from "../../../types";
import { MovieThumbnail } from "../../movie";

interface Props {
	movies: IMovieThumbnail[];
}

export function MovieList({ movies }: Props) {
	return (
		<Grid
			gridTemplateColumns={[
				"repeat(3, 1fr)",
				"repeat(4, 1fr)",
				"repeat(5, 1fr)",
				"repeat(6, 1fr)",
			]}
			gridGap="0.5rem"
		>
			{movies.map((movie, i) => (
				<MovieThumbnail key={i} movie={movie} />
			))}
		</Grid>
	);
}
