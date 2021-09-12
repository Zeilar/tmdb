import { Grid } from "@chakra-ui/react";
import { IMovie } from "../../../types/movie";
import { MovieThumbnail } from "../../movie";

interface Props {
	movies: IMovie[];
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
			{movies.map(movie => (
				<MovieThumbnail key={movie.id} movie={movie} />
			))}
		</Grid>
	);
}
